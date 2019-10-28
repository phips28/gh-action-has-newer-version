## gh-action-has-newer-version

GitHub Action for automated version check for npm packages.

This Action checks if the current checkout's package number is higher than in give branch.
It is meant to be used on every PR update but 
you'll need to configured that workflow yourself. You can look to the
[`.github/workflows/pull-request.yml`](./.github/workflows/pull-request.yml) file in this project as an example.

### Workflow

* Check for the latest version number published to npm.
* Based on the commit messages, increment the version from the lastest release.
  * If the string "BREAKING CHANGE" is found anywhere in any of the commit messages or descriptions the major 
    version will be incremented.
  * If a commit message begins with the string "feat" then the minor version will be increased. This works
    for most common commit metadata for feature additions: `"feat: new API"` and `"feature: new API"`.
  * All other changes will increment the patch version.
* Push the bumped npm version in package.json back into the repo.
* Push a tag for the new version back into the repo.
