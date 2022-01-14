import { GraphQLClient } from "Core";
import * as mutations from "./mutations";

export const startSignIn = (email, password) =>
  GraphQLClient.mutate({
    mutation: mutations.SIGN_IN,
    variables: {
      email,
      password,
    },
  });
