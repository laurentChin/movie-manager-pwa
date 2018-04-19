import React from 'react';

const AuthContext = React.createContext({
  jwt: localStorage.getItem('jwt') || null
});

export default AuthContext;
