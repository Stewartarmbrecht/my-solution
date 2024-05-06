//import { device } from 'detox';
import { openApp } from './detox/utils/openApp';

beforeAll(async () => {
  await openApp();
  //await device.launchApp();
});
