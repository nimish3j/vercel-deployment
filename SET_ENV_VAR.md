# Set NEXT_PUBLIC_API_URL Environment Variable

## Error Message
```
Backend API URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable.
```

## Solution

You need to set the `NEXT_PUBLIC_API_URL` environment variable in your **Frontend** Vercel project.

## Steps to Fix

### 1. Go to Vercel Dashboard
- Visit https://vercel.com/dashboard
- Click on your **Frontend** project (not the backend)

### 2. Navigate to Environment Variables
- Click on **Settings** tab
- Click on **Environment Variables** in the left sidebar

### 3. Add the Environment Variable
Click **Add New** and add:

- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: Your backend Vercel URL
  - Example: `https://your-backend-project.vercel.app`
  - **Do NOT include `/api` at the end** - the routes are at root level
- **Environment**: 
  - ✅ Production
  - ✅ Preview  
  - ✅ Development (optional, for testing)

### 4. Redeploy
After adding the environment variable:
1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger auto-deploy

## How to Find Your Backend URL

1. Go to your **Backend** project in Vercel Dashboard
2. Look at the **Domains** section
3. Copy the URL (e.g., `https://dongri-dms-backend.vercel.app`)
4. Use this URL for `NEXT_PUBLIC_API_URL`

## Example

If your backend is deployed at:
```
https://dongri-dms-backend.vercel.app
```

Then set:
```
NEXT_PUBLIC_API_URL=https://dongri-dms-backend.vercel.app
```

## Verify It's Set

After redeploying, the error should be gone and login should work!

## Important Notes

- ✅ `NEXT_PUBLIC_` prefix is required for Next.js to expose it to the browser
- ✅ The URL should NOT have a trailing slash
- ✅ The URL should NOT include `/api` (routes are at root)
- ✅ Must redeploy after adding environment variables
- ✅ Works in development (localhost) without setting it

## Troubleshooting

### Still Getting the Error?
1. Check that you added it to the **Frontend** project (not backend)
2. Make sure you redeployed after adding the variable
3. Check the deployment logs to see if the variable is being read
4. Verify the backend URL is correct and accessible

### Testing Locally
- In development, you can use `http://localhost:3001` without setting the variable
- The code will only require it in production

