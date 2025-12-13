import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { GraphQLError } from "graphql";

const logoutLink = new ErrorLink((errorResponse: any) => {
  const { graphQLErrors } = errorResponse;

  if (graphQLErrors && graphQLErrors.length > 0) {
    const firstError: GraphQLError = graphQLErrors[0];
    const originalError = firstError.extensions?.originalError as any;

    if (originalError?.statusCode === 401) {
      if (!excludedRoutes.includes(window.location.pathname)) {
        onLogout();
      }
    }
  }
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
