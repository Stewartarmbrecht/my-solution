import { Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify/utils';

import { Authenticator, Theme, ThemeProvider, defaultDarkModeOverride } from '@aws-amplify/ui-react-native';
import { DataStore } from '@aws-amplify/datastore';
//import { ExpoSQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter';
import amplifyconfig from './aws-exports';
import { logCall, logError, logRaw, logSetup, userLoggedIn, userLoggedOut } from '@my-solution/shared';
import { useSynchronizer } from './sync/useSynchronizer';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useDispatch } from 'react-redux';
import { useColorScheme } from '@my-solution/ui';
import { colors } from '@my-solution/ui';

Amplify.configure(amplifyconfig);
DataStore.configure();

export interface BackendProps {
  children: JSX.Element;
}
const theme: Theme = {
  tokens: {
    colors: {
      primary: {
        10:  colors.blue.blue1,
        20:  colors.blue.blue2,
        40:  colors.blue.blue4,
        60:  colors.blue.blue6,
        80:  colors.blue.blue8,
        90:  colors.blue.blue10,
        100: colors.blue.blue12,
      },
    }
  },
  overrides: [{
    tokens: {
      colors: {
        primary: {
          10: colors.blue.blue1,
          20: colors.blue.blue2,
          40: colors.blue.blue4,
          60: colors.blue.blue6,
          80: colors.blue.blue8,
          90: colors.blue.blue10,
          100: colors.blue.blue12,
        },
      },
      ...defaultDarkModeOverride.tokens,
    },
    ...defaultDarkModeOverride
  }],
};

export function Backend(props: BackendProps) {
  logSetup('Backend');
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    logCall('Backend.useEffect');
    const hubListenerCancelToken = Hub.listen('auth', ({ payload }) => {
      logRaw('auth event:', payload.event);
      switch (payload.event) {
        case 'signedIn':
          logRaw('user have been signedIn successfully.', payload.message, payload.data);
          setIsUserLoggedIn(true);
          break;
        case 'signedOut':
          logRaw('user have been signedOut successfully.', payload.message);
          setIsUserLoggedIn(false);
          break;
      }
    });
    return () => {
      hubListenerCancelToken();
    }
  });

  useEffect(() => {
    async function loadUser() {
      logCall('Backend.loadUser');
      try {
        const user = await getCurrentUser();
        dispatch(userLoggedIn({
          userEmail: 'dontknowthat@yet.com',
          userName: user?.username,
        }));
        setIsUserLoggedIn(true);
      } catch (error) {
        dispatch(userLoggedOut());
        logError(error as Error);
      }
    }
    loadUser();
  }, [dispatch, isUserLoggedIn]);

  useSynchronizer(isUserLoggedIn);

  const colorMode = useColorScheme();

  logRaw('Backend colorScheme', colorMode);

  return (
    <ThemeProvider colorMode={colorMode} theme={theme}>
      <Authenticator.Provider>
        <Authenticator>
          {props.children}
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

