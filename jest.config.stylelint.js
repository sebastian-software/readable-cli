/* eslint-disable import/no-commonjs */
const { getStyleFiles, mapToJestRoot } = require(".")
const files = getStyleFiles().map(mapToJestRoot)

module.exports = {
  runner: "jest-runner-stylelint",
  testMatch: files.length > 0 ? files : [ "<rootDir>/-no-matching-git-files-found-" ]
}
