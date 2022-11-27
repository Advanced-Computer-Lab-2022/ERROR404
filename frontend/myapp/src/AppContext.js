import React from "react";

export const AppContext = React.createContext({
  username: null,
  userEmail: null,
  userType: "",
  userPassword: null,
  userMongoId: null,
});
