const { Toolkit } = require('actions-toolkit')
const { execSync } = require('child_process')
const compareVersions = require('compare-versions')

// Run your GitHub Action!
Toolkit.run(async tools => {
  const pkg = tools.getPackageJSON()
  console.log('pkg1', pkg)
  const event = tools.context.payload

  try {
    const currentVersion = pkg.version.toString()

    const branch = tools.arguments.branch
    if (!branch) {
      tools.exit.failure('`branch` needs to be set in `with` config')
      return
    }
    console.log('branch', branch)
    // now go to the given branch to perform the same versioning
    await tools.runInWorkspace('git', ['checkout', branch])

    const pkg2 = tools.getPackageJSON()
    console.log('pkg2', pkg2)
    const branchVersion = pkg2.version.toString()

    console.log(currentVersion, branchVersion)
    if (compareVersions.compare(currentVersion, branchVersion, '>')) {
      tools.exit.success(`current version is higher than in ${branch}. (${currentVersion} > ${branchVersion})`)
    } else {
      tools.exit.failure(`current version must be higher than in ${branch}. (${currentVersion} > ${branchVersion})`)
    }
  } catch (e) {
    tools.log.fatal(e)
    tools.exit.failure('Failed to compare versions')
  }
  tools.exit.success('Version bumped!')
})
