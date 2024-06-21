const { withNxMetro } = require('@nx/expo');
// Added for tamagui.
const { withTamagui } = require('@tamagui/metro-plugin')
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'mjs'],
  },
};
//Added for tamagui.
const tamaguiConfig = withTamagui(defaultConfig, {
    components: ['tamagui'],
    config: '../../libs/ui/tamagui.config.ts',
    outputCSS: './tamagui-web.css',
})

module.exports = withNxMetro(mergeConfig(tamaguiConfig, customConfig), {
  // Change this to true to see debugging info.
  // Useful if you have issues resolving modules
  debug: false,
  // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx', 'json'
  //extensions: [],
  // Specify folders to watch, in addition to Nx defaults (workspace libraries and node_modules)
  //watchFolders: [],
});
