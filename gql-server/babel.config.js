module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV);

  const presets = [["@babel/preset-env"]];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
