/* eslint-disable import/no-commonjs */
const { getScriptFiles, mapToJestRoot } = require(".")

module.exports = {
  runner: "jest-runner-eslint",
  testMatch: getScriptFiles().map(mapToJestRoot)
}
