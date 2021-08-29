import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("fetch user", UserContext);

    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      fetch("/api/user/me", { method: "GET", headers: { authorization: `Bearer: ${localStorage.getItem("token")}` } })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const withUser = (Component) => (props) => (
  <UserContextProvider>
    <Component {...props} />
  </UserContextProvider>
);

export const useUser = () => {
  return React.useContext(UserContext);
};
