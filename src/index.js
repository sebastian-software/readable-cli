import spawn from "cross-spawn"
import { resolve } from "path"
import { readFileSync } from "fs"
import { get as getRoot } from "app-root-dir"

export const root = getRoot()
export const execSync = spawn.sync

export function getGitIgnores() {
  return readFileSync(resolve(root, ".gitignore"), "utf-8")
    .split("\n")
    .map((entry) => entry.trim())
    .filter((entry) => entry !== "" && entry.charAt(0) !== "#")
}

export function getGitFiles(regexp) {
  var gitFiles = execSync("git", [ "ls-files" ], { stdio: "inherit" })
    .stdout.toString()
    .trim()
    .split("\n")

  return gitFiles.filter((fileName) => {
    return regexp ? regexp.exec(fileName) : fileName
  })
}

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

export function lintScript(flags) {
  execSync("eslint", getGitFiles(/\.(mjs|js|jsx)$/), { stdio: "inherit" })
}

export function lintStyle(flags) {
  execSync("stylelint", getGitFiles(/\.(css|scss|pcss)$/), { stdio: "inherit" })
}
