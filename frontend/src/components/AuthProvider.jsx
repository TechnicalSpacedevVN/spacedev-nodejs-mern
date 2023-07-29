import { createContext, useState, useContext } from "react";

const Context = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const login = () => {};
  return (
    <Context.Provider value={{ user, login }}>{children}</Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
