/* eslint-disable import/no-commonjs */
const { getScriptFiles, mapToJestRoot } = require(".")
const files = getScriptFiles().map(mapToJestRoot)

module.exports = {
  runner: "jest-runner-eslint",
  testMatch: files.length > 0 ? files : [ "<rootDir>/-no-matching-git-files-found-" ],
  moduleFileExtensions: [
    "js",
    "mjs",
    "jsx"
  ]
}
