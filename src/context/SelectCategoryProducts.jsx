import React, { createContext, useState } from "react";

export const SelectCategorContext = createContext();

export const SelectCategoryProvider = ({ children }) => {
  const [category, setCategory] = useState(null);

  return (
    <SelectCategorContext.Provider value={{ category, setCategory }}>
      {children}
    </SelectCategorContext.Provider>
  );
};
