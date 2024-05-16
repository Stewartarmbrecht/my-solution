const appConfig = require('../../../my-app/app.config');
const { resolveConfig } = require('detox/internals');
const { device } = require('detox');

const platform = device.getPlatform();

module.exports.openApp = async function openApp() {
  console.log('Opening app...', platform);
  const config = await resolveConfig();
  console.log('Configuration:', config.configurationName);
  if (config.configurationName.split('.')[2] === 'debug') {
    console.log('Opening app for debug build...');
    return await openAppForDebugBuild(platform);
  } else {
    return await device.launchApp({
      newInstance: true,
    });
  }
};

async function openAppForDebugBuild(platform) {
  console.log('EXPO_USE_UPDATES:', process.env.EXPO_USE_UPDATES);
  const deepLinkUrl = process.env.EXPO_USE_UPDATES
    ? // Testing latest published EAS update for the test_debug channel
      getDeepLinkUrl(getLatestUpdateUrl())
    : // Local testing with packager
      getDeepLinkUrl(getDevLauncherPackagerUrl(platform));

  if (platform === 'ios') {
    await device.launchApp({
      newInstance: true,
    });
    sleep(3000);
    await device.openURL({
      url: deepLinkUrl,
    });
  } else {
    console.log('Launching app with deep link:', deepLinkUrl);
    await device.launchApp({
      newInstance: true,
      url: deepLinkUrl,      
    });
  }

  await sleep(3000);
}

const getDeepLinkUrl = url =>
  `exp+my-app://expo-development-client/?url=${encodeURIComponent(url)}`;

const getDevLauncherPackagerUrl = platform => 
  `http://localhost:19002/?disableOnboarding=1`;

const getLatestUpdateUrl = () =>
  `https://u.expo.dev/${getAppId()}?channel-name=test_debug&disableOnboarding=1`;

const getAppId = () => appConfig?.extra?.eas?.projectId ?? '';

const sleep = t => new Promise(res => setTimeout(res, t));
