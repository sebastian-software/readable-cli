/* eslint-disable no-console */
import { clean, cleanFull, lintScript, lintStyle, fixScript, fixStyle } from "./index"
import meow from "meow"

const { input, flags } = meow(
  `
    Usage:
      $ readable <command>

    Commands:
      clean:        Cleans the working directory from generated files
      dist-clean:   Fully cleans the working directory from all files not tracked by Git.
      lint-script:  Lints all script files
      lint-style:   Lints all style files
      fix-script:   Lints and auto-fixes issues in script files
      fix-style:    Lints and auto-fixes issues in style files

    Options:
      --verbose, -v  Verbose output
`,
  {
    flags: {
      verbose: {
        type: "boolean",
        alias: "r",
        default: false
      }
    }
  }
)

for (let command of input) {
  switch (command) {
    case "clean":
      clean(flags)
      break

    case "dist-clean":
      cleanFull(flags)
      break

    case "lint-script":
      lintScript(flags)
      break

    case "lint-style":
      lintStyle(flags)
      break

    case "fix-script":
      fixScript(flags)
      break

    case "fix-style":
      fixStyle(flags)
      break

    default:
      console.warn(`Unknown command: ${command}!`)
  }
}
