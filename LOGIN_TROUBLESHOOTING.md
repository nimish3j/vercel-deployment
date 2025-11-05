# Login Troubleshooting Guide

## Common Issues After Vercel Deployment

### 1. Backend API URL Not Set

**Problem**: `NEXT_PUBLIC_API_URL` environment variable is not set in Vercel.

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Variable**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your deployed backend URL (e.g., `https://your-backend.railway.app`)
   - **Environment**: Production, Preview, Development
3. **Redeploy** after adding the variable

### 2. Backend Not Deployed

**Problem**: The backend API is not deployed or not accessible.

**Solution**: 
- Deploy your NestJS backend to a platform like:
  - Railway: https://railway.app
  - Render: https://render.com
  - Fly.io: https://fly.io
  - Or your own server

### 3. CORS Issues

**Problem**: Backend is blocking requests from Vercel domain.

**Solution**: Update backend CORS settings:
1. In your backend `.env` file, set:
   ```
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
2. Or update `backend/src/main.ts` to allow your Vercel domain

### 4. Check Browser Console

Open browser DevTools (F12) → Console tab and check for:
- Network errors
- CORS errors
- API connection errors

### 5. Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project → Functions
2. Click on `/api/auth/login`
3. Check the logs for errors

### 6. Test Backend Directly

Test if your backend is accessible:
```bash
curl -X POST https://your-backend-url.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"admin123"}'
```

## Quick Debug Steps

1. **Check Environment Variable**: Is `NEXT_PUBLIC_API_URL` set in Vercel?
2. **Check Backend**: Is your backend deployed and accessible?
3. **Check CORS**: Does your backend allow requests from your Vercel domain?
4. **Check Browser Console**: What errors do you see?
5. **Check Network Tab**: What's the actual error response?

## Expected Behavior

- Login should call: `POST /api/auth/login`
- Which calls: `POST ${NEXT_PUBLIC_API_URL}/auth/login`
- Sets httpOnly cookie with JWT token
- Redirects to `/dashboard`

