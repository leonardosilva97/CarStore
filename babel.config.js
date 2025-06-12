module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
            '@domain': './src/domain',
            '@storage': './src/storage',
            '@api': './src/api',
            '@context': './src/context',
          },
        },
      ],
    ],
  };
};
