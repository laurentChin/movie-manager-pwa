import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GRAPHQL_ENDPONT } from "../Auth/constants";

import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPONT
});

const defaultOptions = {
  cache: new InMemoryCache()
};

let GraphQLClient;

if (Cookies.get("jwt")) {
  authenticateGraphQLClient(Cookies.get("jwt"));
} else {
  createAnonymousGraphQLClient();
}

function createAnonymousGraphQLClient() {
  GraphQLClient = new ApolloClient({
    link: httpLink,
    ...defaultOptions
  });
}

function authenticateGraphQLClient(jwt) {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${jwt}`
      }
    };
  });
  GraphQLClient = new ApolloClient({
    link: authLink.concat(httpLink),
    ...defaultOptions
  });
}

export { GraphQLClient, authenticateGraphQLClient };
