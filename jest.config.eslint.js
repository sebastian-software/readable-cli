const lib = require(".")

/* eslint-disable */
module.exports = {
  runner: "jest-runner-eslint",
  testRegex: ".(mjs|js|jsx)$",
  testPathIgnorePatterns: ["/node_modules/"].concat(lib.gitIgnores)
}
