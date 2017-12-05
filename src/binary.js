import { clean, cleanFull, lintScript, lintStyle } from "./index"
import meow from "meow"

const { input, flags } = meow(
  `
    Usage
      $ readable <command>

    Options
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

    case "full-clean":
      cleanFull(flags)
      break

    case "lint-script":
      lintScript(flags)
      break

    case "lint-style":
      lintStyle(flags)
      break

    default:
      console.warn("Unknown command: ")
  }
}
