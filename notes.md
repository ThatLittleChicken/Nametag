# Notes
Notes for CS 260
## Using Git
- `git clone [repo link]` clones a repo
- `git add [filename]` adds changes in working dir to staging area
- `git commit -am "[message]"` -a automatically stage all tracked, modified files before the commit; -m message
- `git push` upload local repo to remote repo
- `git fetch` gets changes into local repo
- `git status` gets status
- `git pull` incorporates changes from a remote repo into the current working dir 
- `git merge` merges branches / resolve divergence
- `git diff HEAD HEAD~1` compares two commit; `~1` refers to 1 earlier
- `git branch [branch name]` creates a branch (effectively a pointer) to a commit
- `git checkout [branch name]` changes working dir to the branch
- `git reset --hard [sha]` does a hard rollback back to a specific commit