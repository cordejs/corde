module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }], "@babel/preset-typescript"],
  plugins: [
    "@babel/plugin-syntax-nullish-coalescing-operator",
    "@babel/plugin-syntax-optional-chaining",
  ],
};
