import type { DefaultSession, Session } from 'next-auth';
import type { NextComponentType, NextPage, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

declare module 'next-auth' {
  interface User {
    access_token: string;
    refresh_token: string;
    access_token_expires: number;
    refresh_token_expires: number;
  }

  interface Session {
    id: string;
    access_token: string;
    refresh_token: string;
    access_token_expires: number;
    refresh_token_expires: number;
    refresh_token_expired: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    access_token: string;
    refresh_token: string;
    access_token_expires: number;
    refresh_token_expires: number;
    refresh_token_expired: boolean;
  }
}

declare module 'next/app' {
  type CustomAppProps<P = Record<string, unknown>> = AppProps<P> & {
    Component: NextComponentType<NextPageContext, any, P> & {
      protected?: boolean;
      getLayout?: (page: ReactElement) => ReactNode;
    };
    pageProps: P & {
      session?: Session;
    };
  };
}

declare module 'next' {
  type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
    protected?: boolean;
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
