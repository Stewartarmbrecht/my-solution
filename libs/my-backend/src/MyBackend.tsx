import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { DataStore } from '@aws-amplify/datastore';
//import { ExpoSQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter';
import amplifyconfig from './aws-exports';
import { logSetup, userLoggedIn } from '@my-sample/my-shared';
import { useSynchronizer } from './sync/useSynchronizer';
import { useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';

Amplify.configure(amplifyconfig);
DataStore.configure();

export interface MyBackendProps {
  children: JSX.Element;
}
export function MyBackend(props: MyBackendProps) {
  logSetup('MyBackend');
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      dispatch(userLoggedIn({
        userEmail: 'dontknowthat@yet.com',
        userName: user?.username,
      }))
    }
    loadUser();
  });

  useSynchronizer();

  return (
    <Authenticator.Provider>
      <Authenticator>
        {props.children}
      </Authenticator>
    </Authenticator.Provider>
  );
}

