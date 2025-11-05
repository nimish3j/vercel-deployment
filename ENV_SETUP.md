# Environment Variable Setup

## Backend URL
Your backend is deployed at:
```
https://vercel-deployment12.vercel.app
```

## Frontend Environment Variable

You need to set this in your **Frontend** Vercel project:

### Variable Details
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://vercel-deployment12.vercel.app`
- **Environments**: Production, Preview, Development

### Steps to Set in Vercel

1. Go to https://vercel.com/dashboard
2. Click on your **Frontend** project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://vercel-deployment12.vercel.app`
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your frontend project

### After Setting

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

After redeploying, login should work! 🎉

## Testing

After redeploying, try logging in:
- Username: `superadmin`
- Password: `admin123`

The frontend will now call your backend at `https://vercel-deployment12.vercel.app/auth/login`.

