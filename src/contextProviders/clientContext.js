import React, { createContext, useContext } from "react";

import createClientStore from "../stores/clientStore";

import { useLocalObservable } from "mobx-react-lite";

const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
  const clientStore = useLocalObservable(createClientStore);

  return (
    <ClientContext.Provider value={clientStore}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientStore = () => useContext(ClientContext);
