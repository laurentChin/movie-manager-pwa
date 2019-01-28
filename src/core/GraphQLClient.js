import ApolloClient from "apollo-boost";

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GQL_SERVER
});

export default apolloClient;
