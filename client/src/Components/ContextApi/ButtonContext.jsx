
import { createContext, useContext, useState } from "react";

const ButtonContext = createContext();

export const useButtonContext = () => useContext(ButtonContext);

export const ButtonProvider = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  return (
    <ButtonContext.Provider value={{ selectedButton, setSelectedButton }}>
      {children}
    </ButtonContext.Provider>
  );
};
