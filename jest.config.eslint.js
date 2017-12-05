/* eslint-disable import/unambiguous, import/no-commonjs */
module.exports = {
  runner: "jest-runner-eslint",
  displayName: "lint:eslint",
  testRegex: ".(mjs|js|jsx)$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "build/",
    "lib/",
    "dist/"
  ]
}
