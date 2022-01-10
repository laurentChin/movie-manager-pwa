import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GRAPHQL_ENDPONT, MOVIE_MANAGER_JWT } from "../Auth/constants";

const httpLink = createUploadLink({
  uri: GRAPHQL_ENDPONT,
  includeExtensions: true
});

const defaultOptions = {
  cache: new InMemoryCache(),
  query: {
    fetchPolicy: "network-only"
  }
};

let GraphQLClient;

function createAnonymousGraphQLClient() {
  GraphQLClient = new ApolloClient({
    link: httpLink,
    ...defaultOptions
  });
}

function authenticateGraphQLClient(jwt) {
  localStorage.setItem(MOVIE_MANAGER_JWT, jwt);
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

if (localStorage.getItem(MOVIE_MANAGER_JWT)) {
  authenticateGraphQLClient(localStorage.getItem(MOVIE_MANAGER_JWT));
} else {
  createAnonymousGraphQLClient();
}

export {
  GraphQLClient,
  authenticateGraphQLClient,
  createAnonymousGraphQLClient
};
