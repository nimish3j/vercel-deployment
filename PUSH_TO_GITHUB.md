# Push to GitHub - Quick Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dongri-dms` (or any name you prefer)
3. Description: "Dongri Document Management System - Monorepo with Next.js frontend and NestJS backend"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/Users/nimishmarathe/oh poc"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dongri-dms.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

If you used SSH instead of HTTPS, the command will be:
```bash
git remote add origin git@github.com:YOUR_USERNAME/dongri-dms.git
```

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files there
3. The database file (`backend/dev.db`) is already excluded by `.gitignore`

## Troubleshooting

### If you get authentication errors:
```bash
# For HTTPS (will prompt for username/password or token)
git remote set-url origin https://github.com/YOUR_USERNAME/dongri-dms.git

# For SSH (requires SSH key setup)
git remote set-url origin git@github.com:YOUR_USERNAME/dongri-dms.git
```

### If the remote already exists:
```bash
# Check current remote
git remote -v

# Remove and add again
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/dongri-dms.git
```

### If you need to update the remote URL:
```bash
git remote set-url origin NEW_URL
```

