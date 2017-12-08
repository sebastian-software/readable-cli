/* eslint-disable import/no-commonjs */
const { getScriptFiles, mapToJestRoot } = require(".")
const root = require("app-root-dir").get()
const files = getScriptFiles()

module.exports = {
  runner: "jest-runner-eslint",
  rootDir: root,
  testMatch: files ? files.map(mapToJestRoot) : [ "<rootDir>/-no-matching-git-files-found-" ],
  moduleFileExtensions: [
    "js",
    "mjs",
    "jsx"
  ]
}
