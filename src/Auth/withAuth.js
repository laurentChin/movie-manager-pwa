import React from "react";

import { AuthContext } from "./";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    return (
      <AuthContext.Consumer>
        {jwt => <Component {...props} jwt={jwt} />}
      </AuthContext.Consumer>
    );
  };
}
