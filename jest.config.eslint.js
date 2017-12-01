/* eslint-disable import/unambiguous, import/no-commonjs */
const readable = require(".")

module.exports = {
  runner: "jest-runner-eslint",
  displayName: "lint:eslint",
  testRegex: ".(mjs|js|jsx)$",
  testPathIgnorePatterns: [ "/node_modules/" ].concat(readable.gitIgnores)
}
