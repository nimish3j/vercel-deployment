# Quick Guide: Deploy to Vercel

Vercel needs your code in a Git repository (GitHub, GitLab, or Bitbucket). Follow these steps:

## Step 1: Initialize Git and Create First Commit

Run these commands in your terminal:

```bash
cd "/Users/nimishmarathe/oh poc"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Dongri DMS monorepo"
```

## Step 2: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dongri-dms` (or any name you prefer)
3. Description: "Dongri Document Management System"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 3: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
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

## Step 4: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your repository (`dongri-dms`)
4. Click **Import**

## Step 5: Configure Vercel Project

1. **Root Directory**: Set to `frontend`
2. **Framework Preset**: Next.js (should auto-detect)
3. **Build Command**: `pnpm install && pnpm build`
4. **Output Directory**: `.next`
5. **Install Command**: `pnpm install`

## Step 6: Add Environment Variables

Click **Environment Variables** and add:

- **Variable Name**: `NEXT_PUBLIC_API_URL`
- **Value**: Your deployed backend API URL (e.g., `https://your-backend.railway.app`)
- **Environment**: Select all (Production, Preview, Development)

## Step 7: Deploy

Click **Deploy** and wait for the build to complete!

---

## Troubleshooting

### If you get authentication errors:
```bash
# For HTTPS (will prompt for username/password or token)
git remote set-url origin https://github.com/YOUR_USERNAME/dongri-dms.git

# For SSH (requires SSH key setup)
git remote set-url origin git@github.com:YOUR_USERNAME/dongri-dms.git
```

### If you need to update the remote URL:
```bash
# Check current remote
git remote -v

# Update remote URL
git remote set-url origin NEW_URL
```

