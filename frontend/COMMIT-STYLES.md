Here's a breakdown of our commit styles, which are based on the Conventional Commits specification. 

**Core Commit Types:**

  * **`feat` (Feature):**
      * Introduces a new feature to the codebase.
      * Example: `feat: add user authentication`
  * **`fix` (Bug Fix):**
      * Corrects a bug.
      * Example: `fix: resolve issue with login form submission`
  * **`docs` (Documentation):**
      * Changes to documentation only.
      * Example: `docs: update README with installation instructions`
  * **`style` (Style):**
      * Changes that do not affect the meaning of the code (e.g., formatting, whitespace).
      * Example: `style: format code with prettier`
  * **`refactor` (Refactoring):**
      * Code changes that neither add a feature nor fix a bug.
      * Example: `refactor: extract user profile component`
  * **`perf` (Performance):**
      * Code changes that improve performance.
      * Example: `perf: optimize database query for user search`
  * **`test` (Tests):**
      * Adding missing tests or correcting existing tests.
      * Example: `test: add unit tests for user service`
  * **`build` (Build):**
      * Changes that affect the build system or external dependencies (e.g., npm, webpack).
      * Example: `build: update webpack configuration`
  * **`ci` (Continuous Integration):**
      * Changes to CI configuration files and scripts (e.g., Travis, Jenkins).
      * Example: `ci: configure Travis CI for automated testing`
  * **`chore` (Chores):**
      * Other changes that don't modify source or test files (e.g., updating .gitignore).
      * Example: `chore: update .gitignore to exclude build artifacts`
  * **`revert` (Revert):**
      * Reverts a previous commit.
      * Example: `revert: feat: add user authentication`

**Commit Message Structure:**

A conventional commit message typically follows this structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

  * **`<type>`:** The commit type (e.g., `feat`, `fix`).
  * **`[optional scope]`:** A scope that provides additional context (e.g., `feat(users):`).
  * **`<description>`:** A short description of the change.
  * **`[optional body]`:** A more detailed explanation of the changes.
  * **\`[optional footer(s)]:** Metadata like issue tracking IDs or breaking changes.

**Example Commit Messages:**

  * `fix(login): handle incorrect password error`
  * `feat(checkout): add support for PayPal payments`
  * `docs: update API documentation for user endpoints`
  * `chore: update dependencies`
  * `perf: improve rendering performance of product list`

**Breaking Changes:**

Breaking changes should be indicated in the footer with `BREAKING CHANGE:`.

```
feat: introduce new API endpoint

BREAKING CHANGE: /v1/users endpoint has been removed
```