/* eslint-disable import/no-commonjs */
const root = require("app-root-dir").get()

module.exports = {
  runner: "jest-runner-stylelint",
  rootDir: root,
  testMatch: [
    "<rootDir>/src/**/*.{css,pcss,sss,scss,sass,less}",
    "<rootDir>/test/**/*.{css,pcss,sss,scss,sass,less}",
    "<rootDir>/__tests__/**/*.{css,pcss,sss,scss,sass,less}",
    "<rootDir>/*.{css,pcss,sss,scss,sass,less}"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/lib/*",
    "<rootDir>/bin/*",
    "<rootDir>/dist/*"
  ],
  moduleFileExtensions: [
    "css",
    "pcss",
    "sss",
    "scss",
    "sass",
    "less"
  ]
}
