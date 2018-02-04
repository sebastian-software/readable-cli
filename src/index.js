import spawn from "cross-spawn"
import { readFileSync } from "fs"
import { resolve } from "path"
import { get as getRoot } from "app-root-dir"
import jest from "jest"


/*
==============================================================================
  UTILITIES
==============================================================================
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
  const gitFiles = execSync("git", [ "ls-files" ], { stdio: "pipe" })
    .stdout.toString()
    .trim()
    .split("\n")

  const result = gitFiles.filter((fileName) => {
    return regexp ? regexp.exec(fileName) : fileName
  })

  return result.length > 0 ? result : null
}

export function mapToJestRoot(entry) {
  return `<rootDir>/${entry}`
}




/*
==============================================================================
  CLEANUP
==============================================================================
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
==============================================================================
  SCRIPT
==============================================================================
*/

const PRETTIER_FLAGS = [ "--write" ]
const SCRIPT_FILES = /\.(mjs|js|jsx)$/

// Disable linting warnings around prettier as these can be auto-fixed.
const ESLINT_LINT_FLAGS = [
  "--rule", "prettier/prettier:off",
  "--format", "pretty"
]
const ESLINT_FIX_FLAGS = [ "--fix", "--format", "pretty" ]

export function getScriptFiles() {
  return getGitFiles(SCRIPT_FILES)
}

export function lintScript(flags) {
  const files = getScriptFiles()
  if (files) {
    execSync("eslint", [ ...ESLINT_LINT_FLAGS, ...files ], {
      stdio: "inherit"
    })
  }
}

export function lintScriptFast(flags) {
  /* eslint-env node */
  jest.run([ "--config", resolve(__dirname, "..", "jest.config.eslint.js") ])
}

export function fixScript(flags) {
  const files = getScriptFiles()
  if (files) {
    execSync("eslint", [ ...ESLINT_FIX_FLAGS, ...files ], {
      stdio: "inherit"
    })
  }
}

export function prettyScript(flags) {
  const files = getScriptFiles()
  if (files) {
    execSync("prettier", [ ...PRETTIER_FLAGS, ...files ], {
      stdio: "inherit"
    })
    fixScript(flags)
  }
}



/*
==============================================================================
  STYLE
==============================================================================
*/

const STYLE_FILES = /\.(css|scss|pcss)$/
const STYLELINT_FIX_FLAGS = [ "--fix" ]

export function getStyleFiles() {
  return getGitFiles(STYLE_FILES)
}

export function lintStyle(flags) {
  const files = getStyleFiles()
  if (files) {
    execSync("stylelint", files, {
      stdio: "inherit"
    })
  }
}

export function lintStyleFast(flags) {
  /* eslint-env node */
  jest.run([ "--config", resolve(__dirname, "..", "jest.config.stylelint.js") ])
}

export function fixStyle(flags) {
  const files = getStyleFiles()
  if (files) {
    execSync("stylelint", [ ...STYLELINT_FIX_FLAGS, ...files ], {
      stdio: "inherit"
    })
  }
}

export function prettyStyle(flags) {
  const files = getStyleFiles()
  if (files) {
    execSync("prettier", [ ...PRETTIER_FLAGS, ...files ], {
      stdio: "inherit"
    })
    fixStyle(flags)
  }
}



/*
==============================================================================
  DOCS: Markdown, ...
==============================================================================
*/

const DOC_FILES = /\.(md|markdown)$/

export function getDocFiles() {
  return getGitFiles(DOC_FILES)
}

export function prettyDoc(flags) {
  const files = getDocFiles()
  if (files) {
    execSync("prettier", [ ...PRETTIER_FLAGS, ...files ], {
      stdio: "inherit"
    })
  }
}



/*
==============================================================================
  DATA: JSON, ...
==============================================================================
*/

const DATA_FILES = /\.(json)$/

export function getDataFiles() {
  return getGitFiles(DATA_FILES)
}

export function prettyData(flags) {
  const files = getDataFiles()
  if (files) {
    execSync("prettier", [ ...PRETTIER_FLAGS, ...files ], {
      stdio: "inherit"
    })
  }
}
