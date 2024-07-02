/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: 'error',
  },
  testRunner: {
    args: {
      $0: 'jest',
      config: './jest.config.json'
    },
    jest: {
      setupTimeout: 120000
    }
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? 'failing' : undefined,
      screenshot: 'failing',
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      build: 'cd ../../apps/my-admin/ios && xcodebuild -workspace MyAdmin.xcworkspace -scheme MyAdmin -configuration Debug -sdk iphonesimulator -destination \'platform=iOS Simulator,name=iPhone 14\' -derivedDataPath ./build -quiet',
      binaryPath: '../../apps/my-admin/ios/build/Build/Products/Debug-iphonesimulator/MyAdmin.app'
    },
    'ios.release': {
      type: 'ios.app',
      build: 'cd ../../apps/my-admin/ios && xcodebuild -workspace MyAdmin.xcworkspace -scheme MyAdmin -configuration Release -sdk iphonesimulator -destination \'platform=iOS Simulator,name=iPhone 14\' -derivedDataPath ./build -quiet',
      binaryPath: '../../apps/my-admin/ios/build/Build/Products/Release-iphonesimulator/MyAdmin.app'
    },
    'android.debug': {
      type: 'android.apk',
      build: 'cd ../../apps/my-admin/android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      binaryPath: '../../apps/my-admin/android/app/build/outputs/apk/debug/app-debug.apk',
      reversePorts: [19002],
    },
    'android.release': {
      type: 'android.apk',
      build: 'cd ../../apps/my-admin/android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
      binaryPath: '../../apps/my-admin/android/app/build/outputs/apk/release/app-release.apk'
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_34_API'
      }
    },
    'android-attached': {
      type: 'android.attached',
      device: {
        adbName: 'G3MX81285D3081000918'
      }
    },
    genycloud: {
      type: 'android.genycloud',
      device: {
        recipeUUID: '95016679-8f8d-4890-b026-e4ad889aadf1'
      }
    }
  },
  configurations: {
    'ios.sim.release': {
      device: 'simulator',
      app: 'ios.release'
    },
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.debug'
    },
    'android.emu.release': {
      device: 'emulator',
      app: 'android.release'
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.debug'
    },
    'android.att.release': {
      device: 'android-attached',
      app: 'android.release'
    },
    'android.att.debug': {
      device: 'android-attached',
      app: 'android.debug'
    },
    'android.genycloud.release': {
      device: 'genycloud',
      app: 'android.release'
    },
    'android.genycloud.debug': {
      device: 'genycloud',
      app: 'android.debug'
    }
  }
};
