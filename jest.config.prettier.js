/* eslint-disable import/unambiguous, import/no-commonjs */
const readable = require(".")

module.exports = {
  runner: "jest-runner-prettier",
  displayName: "lint:prettier",
  testRegex: ".(mjs|js|jsx|json|css|less|scss|pcss|md|markdown)$",
  testPathIgnorePatterns: [ "/node_modules/", "package-lock.json" ].concat(
    readable.gitIgnores
  )
}
