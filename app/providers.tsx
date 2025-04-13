'use client';

import { PropsWithChildren } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export function Providers({ children }: PropsWithChildren) {
  return (
    <Authenticator.Provider>
      {children}
    </Authenticator.Provider>
  );
} 