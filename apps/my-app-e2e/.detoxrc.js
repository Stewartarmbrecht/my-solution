/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: process.env.CI ? 'debug' : undefined,
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
      build: 'cd ../../apps/my-app/ios && xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -configuration Debug -sdk iphonesimulator -destination \'platform=iOS Simulator,name=iPhone 14\' -derivedDataPath ./build -quiet',
      binaryPath: '../../apps/my-app/ios/build/Build/Products/Debug-iphonesimulator/MyApp.app'
    },
    'ios.release': {
      type: 'ios.app',
      build: 'cd ../../apps/my-app/ios && xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -configuration Release -sdk iphonesimulator -destination \'platform=iOS Simulator,name=iPhone 14\' -derivedDataPath ./build -quiet',
      binaryPath: '../../apps/my-app/ios/build/Build/Products/Release-iphonesimulator/MyApp.app'
    },
    'android.debug': {
      type: 'android.apk',
      build: 'cd ../../apps/my-app/android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
      binaryPath: '../../apps/my-app/android/app/build/outputs/apk/debug/app-debug.apk'
    },
    'android.release': {
      type: 'android.apk',
      build: 'cd ../../apps/my-app/android && ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release',
      binaryPath: '../../apps/my-app/android/app/build/outputs/apk/release/app-release.apk'
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
        adbName: 'host.docker.internal'
      }
    },
    genycloud: {
      type: 'android.genycloud',
      device: {
        recipeUUID: '53d71621-b0b8-4e5a-8cea-0055ea98988f'
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
