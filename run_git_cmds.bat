@echo off
set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI"
git config user.name "Thando Hlomuka"
git config user.email "thando@example.com"
git add .
git commit -m "Initial commit for beautiful-store"
gh auth status
