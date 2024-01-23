import { Amplify } from 'aws-amplify';
import { signOut, getCurrentUser, AuthUser } from 'aws-amplify/auth';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { DataStore } from '@aws-amplify/datastore';
//import { ExpoSQLiteAdapter } from '@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter';
import amplifyconfig from './aws-exports';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { logCall, logSetup } from '@my-sample/my-logger';
Amplify.configure(amplifyconfig);
DataStore.configure();


export interface MyBackendProps {
  children?: React.ReactNode;
}
export function MyBackend(props: MyBackendProps) {
  logSetup('MyBackend');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  async function handleSignOut() {
    try {
      // logCall('MyBackend.handleSignOut.DataStore.start');
      // await DataStore.start();
      logCall('MyBackend.handleSignOut.DataStore.stop');
      await DataStore.stop();
      logCall('MyBackend.handleSignOut.DataStore.clear');
      await DataStore.clear();
      // logCall('MyBackend.handleSignOut.DataStore.start');
      // await DataStore.start();      
      logCall('MyBackend.handleSignOut.signOut');
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  useEffect(() => {
    async function loadBackend() {
      // logCall('MyBackend.start');
      // await DataStore.start();
      // logCall('MyBackend.clear');
      // await DataStore.clear();
      setUser(await getCurrentUser());
      setLoading(false);
    }
    loadBackend();
  }, []); // Or [] if effect doesn't need props or state  

  return (
    <Authenticator.Provider>
      <Authenticator>
        {loading ? 
          <Text>Loading...</Text> 
          : 
          <SafeAreaView>
            <Text style={styles.textLg}>Hello there {user?.username},</Text>
            <Pressable 
              onPress={handleSignOut}
              style={styles.testButton}
            >
              <Text style={[styles.textMd, styles.textCenter]}>Sign Out</Text>
            </Pressable>
            <View>
              <Text>Username: {user?.username}</Text>
            </View>
            {props.children}
          </SafeAreaView>
        }
      </Authenticator>
    </Authenticator.Provider>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12,
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  testButton: {
    backgroundColor: '#cccccc',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
});
