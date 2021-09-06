import React, { useState, useEffect } from "react";
import { authManager } from "../utils/authUtils";

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    authManager.tryLogin().then((data) => setUser(data));
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const withUser = (Component) => (props) => (
  <UserContextProvider>
    <Component {...props} />
  </UserContextProvider>
);

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
