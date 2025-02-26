import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState([]);

  const addLoadingItem = (item) => {
    console.log("adding", item);
    setLoadingState((prev) => [...prev, item]);
  };

  const removeLoadingItem = (item) => {
    setLoadingState((prev) => prev.filter((i) => i !== item));
  };

  const isLoading = loadingState.length > 0;

  return (
    <LoadingContext.Provider
      value={{ addLoadingItem, removeLoadingItem, isLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
