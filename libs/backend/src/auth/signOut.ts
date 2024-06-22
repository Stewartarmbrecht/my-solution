import { logCall, logError } from "@my-solution/shared";
import { DataStore } from '@aws-amplify/datastore';
import { signOut as authSignOut } from '@aws-amplify/auth';

export async function signOut() {
  try {
    // logCall('Backend.handleSignOut.DataStore.start');
    // await DataStore.start();
    // logCall('signOut.DataStore.stop');
    // await DataStore.stop();
    logCall('signOut.authSignOut');
    await authSignOut();

    logCall('signOut.DataStore.clearing');
    await DataStore.clear();
    logCall('signOut.DataStore.cleared');
  } catch (error) {
    /* istanbul ignore next */
    if (error instanceof Error) {
      logError(error);
    }
  }
}