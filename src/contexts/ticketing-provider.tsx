import React, { ReactNode } from "react";
import {
  TicketingContext,
  useTicketingContextValue,
} from "./ticketing-context";

export type TicketingProviderProps = {
  children: ReactNode;
};

const TicketingProvider = (props: TicketingProviderProps) => {
  const { children } = props;
  const TicketingContextData = useTicketingContextValue();

  return (
    <TicketingContext.Provider value={TicketingContextData}>
      {children}
    </TicketingContext.Provider>
  );
};

export default TicketingProvider;
