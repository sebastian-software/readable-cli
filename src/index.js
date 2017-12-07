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

const PRETTIER_FLAGS = [ "--write" ]
const SCRIPT_FILES = /\.(mjs|js|jsx)$/

// Disable linting warnings around prettier as these can be auto-fixed.
const ESLINT_LINT_FLAGS = [
  "--rule", "prettier/prettier:off",
  "--format", "pretty"
]
const ESLINT_FIX_FLAGS = [ "--fix", "--format", "pretty" ]

export function lintScript(flags) {
  const files = getGitFiles(SCRIPT_FILES)
  if (files.length > 0) {
    execSync("eslint", [ ...ESLINT_LINT_FLAGS, ...getGitFiles(SCRIPT_FILES) ], {
      stdio: "inherit"
    })
  }
}

export function fixScript(flags) {
  const files = getGitFiles(SCRIPT_FILES)
  if (files.length > 0) {
    execSync("eslint", [ ...ESLINT_FIX_FLAGS, ...getGitFiles(SCRIPT_FILES) ], {
      stdio: "inherit"
    })
  }
}

export function prettyScript(flags) {
  const files = getGitFiles(SCRIPT_FILES)
  if (files.length > 0) {
    execSync("prettier", [ ...PRETTIER_FLAGS, ...files ], {
      stdio: "inherit"
    })
    fixScript(flags)
  }
}



/*
 * ============================================================================
 *  STYLE
 * ============================================================================
 */

const STYLE_FILES = /\.(css|scss|pcss)$/

export function lintStyle(flags) {
  const files = getGitFiles(STYLE_FILES)
  if (files.length > 0) {
    execSync("stylelint", files, { stdio: "inherit" })
  }
}

export function fixStyle(flags) {
  const files = getGitFiles(STYLE_FILES)
  if (files.length > 0) {
    execSync("stylelint", files, { stdio: "inherit" })
  }
}

export function prettyStyle(flags) {
  const files = getGitFiles(STYLE_FILES)
  if (files.length > 0) {
    execSync("prettier", [ ...PRETTIER_FLAGS, ...files ], {
      stdio: "inherit"
    })
    fixStyle(flags)
  }
}
