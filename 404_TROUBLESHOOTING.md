# 404 Error Troubleshooting

## Issue
Getting `Request failed with status code 404` when calling backend API.

## Possible Causes

### 1. Backend Not Deployed Correctly
Check if your backend is actually deployed:
- Visit: https://vercel-deployment12.vercel.app/
- Should show a response (even if it's an error)

### 2. Route Not Found
The route might not be matching correctly. Test these endpoints:

- **Health check**: `https://vercel-deployment12.vercel.app/health`
- **Root**: `https://vercel-deployment12.vercel.app/`
- **Login**: `https://vercel-deployment12.vercel.app/auth/login`

### 3. Vercel Routing Configuration
The `vercel.json` might need adjustment. I've updated it to use `rewrites` instead of `routes`.

## Quick Tests

### Test 1: Health Check
```bash
curl https://vercel-deployment12.vercel.app/health
```
Should return: `{"status":"ok","timestamp":"..."}`

### Test 2: Login Endpoint
```bash
curl -X POST https://vercel-deployment12.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"superadmin","password":"admin123"}'
```
Should return: `{"user":{...},"token":"..."}`

### Test 3: Root Endpoint
```bash
curl https://vercel-deployment12.vercel.app/
```
Should return: `"Hello World!"` or similar

## What I Fixed

1. ✅ Changed `routes` to `rewrites` in `vercel.json` (Vercel v2 uses `rewrites`)
2. ✅ Added error handling to the handler
3. ✅ Added better logging

## Next Steps

1. **Push the fix**:
   ```bash
   git add backend/vercel.json backend/api/index.ts
   git commit -m "Fix Vercel routing configuration"
   git push origin main
   ```

2. **Redeploy backend** in Vercel (should auto-deploy from push)

3. **Test the endpoints** using the curl commands above

4. **Check Vercel Function Logs**:
   - Go to Vercel Dashboard → Backend Project
   - Go to **Functions** tab
   - Click on `/api/index`
   - Check the logs for errors

## Common Issues

### Issue: All routes return 404
**Fix**: Check if the serverless function is deployed correctly. Look at Vercel build logs.

### Issue: Only some routes return 404
**Fix**: Check if the route path matches exactly (case-sensitive, no trailing slashes).

### Issue: Handler not found
**Fix**: Make sure `api/index.ts` exists and is in the correct location.

## Debugging

If still getting 404:

1. Check Vercel build logs for errors
2. Check Vercel function logs for runtime errors
3. Verify the function is deployed at `/api/index`
4. Test with curl to see the actual error message
5. Check if Prisma client was generated (needed for database)

## Need More Help?

Share:
- The exact URL you're calling
- The response you're getting
- Vercel function logs (if available)

