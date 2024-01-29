import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { DataStore } from '@aws-amplify/datastore';
//import { ExpoSQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter';
import amplifyconfig from './aws-exports';
import { logSetup } from '@my-sample/my-shared';
import { Synchronizer } from './sync/Synchronizer';

Amplify.configure(amplifyconfig);
DataStore.configure();


export interface MyBackendProps {
  children: JSX.Element;
}
export function MyBackend(props: MyBackendProps) {
  logSetup('MyBackend');

  return (
    <Authenticator.Provider>
      <Authenticator>
        <Synchronizer>
          {props.children}
        </Synchronizer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

