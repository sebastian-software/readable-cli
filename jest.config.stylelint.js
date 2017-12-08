/* eslint-disable import/no-commonjs */
const { getStyleFiles, mapToJestRoot } = require(".")
const files = getStyleFiles()

module.exports = {
  runner: "jest-runner-stylelint",
  testMatch: files ? files.map(mapToJestRoot) : [ "<rootDir>/-no-matching-git-files-found-" ],
  moduleFileExtensions: [
    "css",
    "pcss",
    "sss",
    "scss",
    "sass"
  ]
}
