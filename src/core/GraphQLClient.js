import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import localforage from "localforage";
import { GRAPHQL_ENDPONT } from "../Auth/constants";
import { PERSISTED_FULL_STORE_NAME } from "../constants";

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

localforage.getItem(PERSISTED_FULL_STORE_NAME).then(rawStore => {
  const { auth: rawAuth } = JSON.parse(rawStore);
  const { jwt } = JSON.parse(rawAuth);
  if (jwt) {
    authenticateGraphQLClient(jwt);
  } else {
    createAnonymousGraphQLClient();
  }
});

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

export {
  GraphQLClient,
  authenticateGraphQLClient,
  createAnonymousGraphQLClient
};
