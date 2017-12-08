/* eslint-disable import/no-commonjs */
const { getScriptFiles, mapToJestRoot } = require(".")
const files = getScriptFiles()

module.exports = {
  runner: "jest-runner-eslint",
  testMatch: files ? files.map(mapToJestRoot) : [ "<rootDir>/-no-matching-git-files-found-" ],
  moduleFileExtensions: [
    "js",
    "mjs",
    "jsx"
  ]
}
