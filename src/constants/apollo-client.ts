import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { ErrorLink } from "@apollo/client/link/error";
import { Observable } from "rxjs";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import router from "../components/Routes";

const logoutLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    const firstError = error.errors[0];
    if ((firstError.extensions?.originalError as any)?.statusCode === 401) {
      if (!excludedRoutes.includes(window.location.pathname)) {
        router.navigate("/login");
      }
      // Boş bir response döndür (data: null)
      return new Observable((observer) => {
        observer.next({ data: null });
        observer.complete();
      });
    }
  }
  // Diğer hatalarda zinciri devam ettir
  return forward ? forward(operation) : undefined;
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
