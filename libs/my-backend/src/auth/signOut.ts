import { logCall, logError } from "@my-solution/my-shared";
import { DataStore } from '@aws-amplify/datastore';
import { signOut as authSignOut } from '@aws-amplify/auth';

export async function signOut() {
  try {
    // logCall('MyBackend.handleSignOut.DataStore.start');
    // await DataStore.start();
    logCall('signOut.DataStore.clear');
    await DataStore.clear();
    // logCall('signOut.DataStore.stop');
    // await DataStore.stop();
    logCall('signOut.authSignOut');
    await authSignOut();
  } catch (error) {
    /* istanbul ignore next */
    if (error instanceof Error) {
      logError(error);
    }
  }
}