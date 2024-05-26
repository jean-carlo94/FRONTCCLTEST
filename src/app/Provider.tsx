'use client';

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode
}
  
  export const Providers: FC<Props> = ({ children }) => {
    return(
    <SessionProvider>
      <SWRConfig
        value={{
          dedupingInterval: 100,
          refreshInterval: 3000,
          fallback: { a: 1, b: 1 },
          provider: () => new Map(),
        }}
      >
        { children }
      </SWRConfig>
    </SessionProvider>
    )
  }