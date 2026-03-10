@echo off
set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI"
git init
git add .
git commit -m "Initial commit: beautiful-store Next.js app with Prisma and Supabase"
gh auth login --with-token < NUL 2>NUL
gh repo create beautiful-store --public --source=. --remote=origin --push
