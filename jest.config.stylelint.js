/* eslint-disable import/no-commonjs */
const { getStyleFiles, mapToJestRoot } = require(".")
const root = require("app-root-dir").get()
const files = getStyleFiles()

module.exports = {
  runner: "jest-runner-stylelint",
  rootDir: root,
  testMatch: files ? files.map(mapToJestRoot) : [ "<rootDir>/-no-matching-git-files-found-" ],
  moduleFileExtensions: [
    "css",
    "pcss",
    "sss",
    "scss",
    "sass"
  ]
}
