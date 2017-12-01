function clean() {
  console.log(
    execSync("git", ["clean", "--force"], { stdio: "pipe" }).stdout.toString()
  )
}

function cleanFull() {
  console.log(
    execSync("git", ["clean", "--force", "-x"], {
      stdio: "pipe"
    }).stdout.toString()
  )
}
