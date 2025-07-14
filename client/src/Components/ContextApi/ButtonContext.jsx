import { createContext, useContext } from "react";
import { useButtonStore } from "../store/useButtonStore";

const ButtonContext = createContext();

export const useButtonContext = () => {
  const store = useButtonStore();
  return store;
};

export const ButtonProvider = ({ children }) => {
  return (
    <ButtonContext.Provider value={{}}>
      {children}
    </ButtonContext.Provider>
  );
};