import spawn from "cross-spawn"
import { get as getRoot } from "app-root-dir"

/*
 * ============================================================================
 *  UTILITIES
 * ============================================================================
 */

export const ROOT = getRoot()
export const execSync = spawn.sync

export function getGitIgnores() {
  return readFileSync(resolve(ROOT, ".gitignore"), "utf-8")
    .split("\n")
    .map((entry) => entry.trim())
    .filter((entry) => entry !== "" && entry.charAt(0) !== "#")
}

export function getGitFiles(regexp) {
  var gitFiles = execSync("git", [ "ls-files" ], { stdio: "pipe" })
    .stdout.toString()
    .trim()
    .split("\n")

  return gitFiles.filter((fileName) => {
    return regexp ? regexp.exec(fileName) : fileName
  })
}




/*
 * ============================================================================
 *  CLEANUP
 * ============================================================================
 */

export function clean() {
  execSync("git", [ "clean", "--force" ], {
    stdio: "inherit"
  })
}

export function cleanFull() {
  execSync("git", [ "clean", "--force", "-x" ], {
    stdio: "inherit"
  })
}




/*
 * ============================================================================
 *  SCRIPT
 * ============================================================================
 */

const SCRIPT_FILES = /\.(mjs|js|jsx)$/

 // Disable linting warnings around prettier as these can be auto-fixed.
const ESLINT_LINT_FLAGS = [
  "--rule", "prettier/prettier:off",
  "--format", "pretty"
]
const ESLINT_FIX_FLAGS = [ "--fix", "--format", "pretty" ]

export function lintScript(flags) {
  execSync("eslint", [ ...ESLINT_LINT_FLAGS, ...getGitFiles(SCRIPT_FILES) ], {
    stdio: "inherit"
  })
}

export function fixScript(flags) {
  execSync("eslint", [ ...ESLINT_FIX_FLAGS, ...getGitFiles(SCRIPT_FILES) ], {
    stdio: "inherit"
  })
}

export function prettyScript(flags) {
  execSync("prettier", getGitFiles(SCRIPT_FILES), { stdio: "inherit" })
  fixStyle(flags)
}



/*
 * ============================================================================
 *  STYLE
 * ============================================================================
 */

const STYLE_FILES = /\.(css|scss|pcss)$/

export function lintStyle(flags) {
  execSync("stylelint", getGitFiles(STYLE_FILES), { stdio: "inherit" })
}

export function fixStyle(flags) {
  execSync("stylelint", getGitFiles(STYLE_FILES), { stdio: "inherit" })
}

export function prettyStyle(flags) {
  execSync("prettier", getGitFiles(STYLE_FILES), { stdio: "inherit" })
  fixStyle(flags)
}
