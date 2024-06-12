module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          containers: './src/containers',
          hooks: './src/hooks',
          i18n: './src/i18n',
          navigation: './src/navigation',
          store: './src/store',
          screens: './src/screens',
          types: './src/types',
          theme: './src/theme',
          utils: './src/utils',
          services: './src/services',
          api: './src/api',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
