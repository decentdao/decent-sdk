import React, { createContext, PropsWithChildren } from 'react';
import { DEFAULT_API_URL } from '../../core/fetch/common/constants';

export type DecentApiContextData = {
  apiUrl: string;
};

export const DecentApiContext = createContext<DecentApiContextData>({
  apiUrl: DEFAULT_API_URL,
});

export function DecentApiProvider(
  { apiUrl = DEFAULT_API_URL, children }: PropsWithChildren<Partial<DecentApiContextData>>
) {
  return (
    <DecentApiContext.Provider value={{ apiUrl }}>
      {children}
    </DecentApiContext.Provider>
  );
}
