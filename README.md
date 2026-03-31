## gh-action-has-newer-version

GitHub Action for automated version check for npm packages.

This Action checks if the current checkout's package number is higher than in give branch.
It is meant to be used on every PR update but 
you'll need to configured that workflow yourself. You can look to the
[`.github/workflows/pull-request.yml`](./.github/workflows/pull-request.yml) file in this project as an example.

### Workflow

* Get version (1) from package.json of current branch.
* Switch to the given branch via `with: origin/master` variable. !IMPORTANT: always use `origin/` prefix.
* Get version (2) from package.json of the given branch.
* Check if version 1 is greater than version 2
