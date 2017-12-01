import spawn from "cross-spawn"

export const execSync = spawn.sync

export function getGitFiles(regexp) {
  var gitFiles = execSync("git", [ "ls-files" ], { stdio: "pipe" })
    .stdout.toString()
    .trim()
    .split("\n")

  return gitFiles.filter((fileName) => {
    return regexp.exec(fileName)
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
