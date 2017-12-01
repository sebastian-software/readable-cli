import spawn from "cross-spawn"
import { resolve } from "path"
import { readFileSync } from "fs"
import { get as getRoot } from "app-root-dir"

export const root = getRoot()
export const execSync = spawn.sync

export const gitIgnores = readFileSync(resolve(root, ".gitignore"), "utf-8")
  .split("\n")
  .map((entry) => entry.trim())
  .filter((entry) => entry !== "" && entry.charAt(0) !== "#")

export function getGitFiles(regexp) {
  var gitFiles = execSync("git", [ "ls-files" ], { stdio: "pipe" })
    .stdout.toString()
    .trim()
    .split("\n")

  return gitFiles.filter((fileName) => {
    return regexp ? regexp.exec(fileName) : fileName
  })
}

export function clean() {
  console.log(
    execSync("git", [ "clean", "--force" ], { stdio: "pipe" }).stdout.toString()
  )
}

export function cleanFull() {
  console.log(
    execSync("git", [ "clean", "--force", "-x" ], {
      stdio: "pipe"
    }).stdout.toString()
  )
}

export function lintScripts() {
  const config = resolve(__dirname, "..", "jest.config.eslint.js")
  execSync("jest", [ "--config", config ], { stdio: "inherit" })
}

export function fixScripts() {
  const config = resolve(__dirname, "..", "jest.config.eslint.js")
  execSync("jest", [ "--config", config ], { stdio: "inherit" })
}
