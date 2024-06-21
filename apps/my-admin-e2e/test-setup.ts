//import { device } from 'detox';
import { openApp } from './detox/utils/openApp';
import 'dotenv/config'

beforeAll(async () => {
  await openApp();
  //await device.launchApp();
});
