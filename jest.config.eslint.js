/* eslint-disable import/no-commonjs */
const root = require("app-root-dir").get()

module.exports = {
  runner: "jest-runner-eslint",
  rootDir: root,
  testMatch: [
    "<rootDir>/src/**/*.{js,jsx,mjs}",
    "<rootDir>/test/**/*.{js,jsx,mjs}",
    "<rootDir>/__tests__/**/*.{js,jsx,mjs}",
    "<rootDir>/*.{js,jsx,mjs}"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/lib/*",
    "<rootDir>/bin/*",
    "<rootDir>/dist/*"
  ],
  moduleFileExtensions: [ "js", "mjs", "jsx" ]
}
