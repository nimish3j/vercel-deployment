# Vercel Deployment Setup

## Important Configuration

When deploying on Vercel, you need to configure the project settings in the Vercel Dashboard:

### Project Settings

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **General**
3. Set the following:

   - **Root Directory**: `frontend` (Set this in Vercel Dashboard, NOT in vercel.json)
   - **Framework Preset**: Next.js
   - **Build Command**: `npm install && npm run build` (or leave default)
   - **Output Directory**: `.next` (or leave default)
   - **Install Command**: `npm install` (or leave default)

### Environment Variables

Go to **Settings** → **Environment Variables** and add:

- **Variable**: `NEXT_PUBLIC_API_URL`
- **Value**: Your deployed backend API URL (e.g., `https://your-backend.railway.app`)
- **Environment**: Select all (Production, Preview, Development)

### Why rootDirectory is removed

The `rootDirectory` property should be set in Vercel Dashboard under Project Settings, not in `vercel.json`. The `vercel.json` file is for build configuration only.

## Alternative: Deploy from frontend directory

If you prefer, you can also:

1. Create a separate Vercel project pointing directly to the `frontend` folder
2. Or use Vercel CLI from the frontend directory:
   ```bash
   cd frontend
   vercel
   ```

