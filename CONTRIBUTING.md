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

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/about-git-rebase)
   feature to tidy up your commits before making them public.

5. When you are ready, clean up. Squash together minor commits.

	```
	git rebase -i
	```

6. Update your branch so that it is based on top of the latest code from the Flarum repository.

	```
	git fetch origin
	git rebase origin/master
	```

7. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

8. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

9. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

**IMPORTANT**: Every Pull request should target the develop branch.
