import React from "react";

export const AppContext = React.createContext({
  userName: null,
  userEmail: null,
  userType: "",
  userPassword: null,
  userMongoId: null,
});
