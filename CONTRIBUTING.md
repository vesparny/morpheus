### What Can I Do?

- **Contribute code.** See below for instructions on Submitting a Pull Request.
- **Participate in discussion.**
- **Spread the word.** Know someone who could help out? Please share this project with them!

#### Submitting a Pull Request

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.


1. [Fork](https://help.github.com/articles/fork-a-repo) the project, clone your

fork, and configure the remotes:

```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/morpheus.git
# Navigate to the newly cloned directory
cd morpheus
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/vesparny/morpheus.git
```

2. Create a new topic branch (off the develop branch) to contain your feature, change, or fix:

```bash
git checkout develop
git checkout -b <topic-branch-name>
```

3. Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

4. When you are ready, clean up. Squash together minor commits. Use Git's [interactive rebase](https://help.github.com/articles/about-git-rebase) feature to tidy up your commits before making them public.

```bash
git rebase -i
```

5. Rebase the current topic branch onto upstream/develop to get the last changes (needed if it takes you a while to finish your changes).

```bash
git fetch upstream
git rebase upstream/develop
```
You might have to fix merge conflicts. git status will show you the unmerged files. Resolve all the conflicts, then continue the rebase:

```bash
git add ... # add resolved files
git rebase --continue
```

6. Check that all tests still pass and push your branch remotely:

```bash
git push origin <topic-branch-name>
```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description.
