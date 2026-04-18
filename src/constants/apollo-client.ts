import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { API_URL, WS_URL } from "./urls";
import { SetContextLink } from "@apollo/client/link/context";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { GraphQLError } from "graphql";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { getToken } from "../utils/token";

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

const authLink = new SetContextLink(({ headers }, _) => {
  return {
    headers: {
      ...headers,
      authorization: getToken(),
    },
  };
});

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
    connectionParams: () => ({
      credentials: "include",
    }),
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(authLink).concat(splitLink),
});

export default client;
