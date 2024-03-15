/*
! Git and GitHub Basics:
Git is a version control system that allows you to save (commit) versions of your code, including details such as the time of the change, the person who made the change, and the specific changes made.
It facilitates contributing to projects, collaborating to fix issues, reverting changes, and keeping track of who made each change.
GitHub is a web-based hosting service for Git repositories, providing a platform for developers to collaborate on projects and host them online.

* Git Stages:
--------------- locally -------------------
Working Directory: Where you write your code.
Staging Area: Where you prepare the version to be saved.
Local Repository: Where the version is saved on your PC.
--------------- online -------------------
Remote Repository: The uploaded and hosted version online on a version control platform like GitHub or GitLab.

* Pushing to GitHub:
git init: Initialize a Git repository in the working directory.
git status: Check for any files not added to the staging area.
git add . (or *): Add all files to the staging area.
git commit -m "message": Move files from the staging area to the local repo.
git remote add origin <repo_link>: Add the link of the host repo (GitHub or GitLab).
git push -u origin master: Move from the local repo to GitHub.

* Pulling from GitHub:
git clone <repo_link>: Clone a project into your VSCode.
- If changes are made to the repository:
git pull or git pull origin master: Pull changes and merge them with your local repo.
git fetch and then git merge: Achieves the same result.

* Commits:
Every change made and committed is considered a version.
git log: to see the history of the repo, including commit messages, times, and commit IDs.
git checkout <commit-hash>:  to move between commits.

* Branches in Git:
Branches allow for parallel lines of development, enabling work on different features or fixes without affecting the main codebase.
Main branch: Typically called master, contains all commits. (some rename it to main)
- git checkout -b <branch-name> => to create a new branch out of the current commit
- git branch => to see all branches
- git branch -d <branch-name> => to delete a branch
master -- commit 1 -- fix btn -- 
                |
            little_feature -- v1 -------- v2
- git checkout -b little_feature => to move between branches
after making a branch and some changes pushing won't work cz github doesn't have that branch
- git push --set-upstream origin little_feature  => to push the changes and the new branch


! Pull Requests:
In a GitHub repo, you can create a pull request to propose merging changes from one branch into another master & little_feature, you can also choose
the assigner (the one who worked on it) and the reviewer (who is gonna review it).
- the owner of reviewer finds the pull request and he can review it, if he didn't find conflicts with the base branch, he can do merge pull request
-- Create a Merge Commit: 
This option creates a merge commit that preserves the entire history of the merged branches, including individual commits from both branches.
-- Squash and Merge: 
Squashing the commits condenses all changes into a single commit before merging, simplifying the commit history.
-- Rebase and Merge: 
todo: i don't know

- after being merged you can delete the pull request or leave it, or delete the additional branch (so they don't accumulate)
- git merge little_feature: would merge it and git push to push it but not recommended cause it doesn't send a pull request
- when the pull req is accepted you'are added to the contributors



* forks 
making a copy of it from one user's account to another user's account. This copy includes all files, branches, and commit history from the original repository
after working on the fork and send a pull request to the owner so he can review it and decide to accept it or not

* Issues Tab on GitHub:
Used the Issues tab to track bugs, enhancements, or tasks related to a repository. Create, discuss, and close issues as needed.
- you can create a new issue. They can provide a title, description, labels (for categorization), assignees (to assign the issue to specific users), and other relevant information.
Title: Bug in button.js
Description:
In the latest branch, the addition of button.js is causing a problem. It seems to be affecting the functionality of the application.
solution: 
i don't know but propose deleting it
- other users can join the discussion by commenting, also they can make a branch and solve the problem by deleting the button 
and commenting on the issue i solved it and send a pull request of #4delete_button and waiting, so the owner can accept the pull req
and do close as completed, so no one would think about it or closed as not planned for spams or useless issues, you can reopen the issue whenever you want

* GitHub Actions:
Automate various tasks within software development workflows directly from GitHub repo. so pushing to the repo would trigger an action
- when we push to our repo , we can trigger an action, go to tab actions, like deploy, security, automation ,pages...etc
- let's try dependency review(security): it scans pull requests on each push for the introduction or resolution of important dependencies
- actions would be stored in a folder called workflow and committed, so when you pull the changes you see it
- next time when you push a commit , you see all checked before getting accepted
*/ 




/*
notes: 
- commits messages should be short and comprehensible => adding (ad), deleting(del), up, fix index.js
? git ignore 
sometimes we need to keep specific files untracked like: private files, or large ones
- the file should be untracked first, git rm --cached home.js => to take it from tracked to untracked
- create folder .gitignore
- write the files names inside that file
home.js or *.js (every file that ends with js)
? create a live server link for a repo
in the repo enter settings go to branch and choose the branch, wait til the link appear
? aliases (alternative name)
git status => git config --global alias.st status => now you can use it with : git st 
git branch => will get you branches => git br (doesn't delete the first one)
git config --global --edit => will open the data folder and you can add them from ther
- git status -s => will simplify the status
? undo a commit 
- git revert, inside the file <commit name> <description>
make a new commit that looks like the one you chose
- git reset head~~1 => to delete one commit 
git push -f origin master => to force or update the latest commit not make a new commit
! git configuration
git help config => to see commands
git config --global user.email => do them again to see the saved ones
git config --global user.name 
git config --global --unset user.name => to delete it

git config --global --edit => to open the file of configuration to edit them manually
note: you can even change colors from it

! tools
-  git lens (does everything)
-- it shows on the line (the author, date, the commit message)
- git blame
- git history

! SSH authentication
you can provide secure communication between your local machine and remote repo without using the email,password every time

- generate SSH key => ssh-keygen -t rsa -b 4090 -c "emailToproveYouAreTheOwner@gmail.com"
press ok for default location and do a passphrase (authentication in a file and passphrase i another)
type .ssh/rsa.pub => to get the public key => ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC...
- add ssh to github,settings,ssh and gpg so you would only need the passphrase 000000
- in github, setting, ssh and gpg, add the ssh key
- initialize a repo and add it and commit it
- before pushing 
. git remote add origin git@github.com:<username>/<repository>.git
github username and repo name
git push -u origin main => they d ask the passphrase 000000
*/ 