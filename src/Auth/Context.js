import React from 'react';

import Cookies from 'js-cookie';

const AuthContext = React.createContext({
  jwt: Cookies.get('jwt') || null
});

export default AuthContext;
