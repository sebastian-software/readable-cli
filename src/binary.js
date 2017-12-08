/* eslint-disable no-console */
import {
  clean,
  cleanFull,
  lintScript,
  lintScriptFast,
  lintStyle,
  fixScript,
  fixStyle,
  prettyScript,
  prettyStyle
} from "./index"
import meow from "meow"

const { input, flags, showHelp } = meow(`
  Tooling for readable code.

  Usage:
    $ readable <command>

  Commands:
    clean:             Cleans the working directory from generated files
    dist-clean:        Fully cleans the working directory from all files not tracked by Git.

    lint-script:       Lints all script files
    lint-style:        Lints all style files

    lint-script-fast:  Lints all script files (in parallel with Jest)

    fix-script:        Lints and auto-fixes issues in script files
    fix-style:         Lints and auto-fixes issues in style files

    pretty-script:     Reformats and auto-fixes issues in script files
    pretty-style:      Reformats and auto-fixes issues in style files

  Options:
    --help, -h         Show help text
    --verbose, -v      Verbose output
`,
  {
    flags: {
      verbose: {
        type: "boolean",
        alias: "r",
        default: false
      },

      help: {
        type: "boolean",
        alias: "h",
        default: false
      }
    }
  })

if (input == null || input.length === 0) {
  showHelp()
}

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

    case "lint-script-fast":
      lintScriptFast(flags)
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

    case "pretty-script":
      prettyScript(flags)
      break

    case "pretty-style":
      prettyStyle(flags)
      break

    default:
      console.warn(`Unknown command: ${command}!`)
  }
}
