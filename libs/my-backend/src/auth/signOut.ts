import { logCall } from "@my-sample/my-shared";
import { DataStore } from '@aws-amplify/datastore';

export async function signOut() {
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