# ✅ Railway Deployment Checklist

## Pre-Deployment

- [ ] MongoDB Atlas account created
- [ ] MongoDB username: `tarshanvivek_db_user`
- [ ] MongoDB password: `Tarsh_2106`
- [ ] MongoDB cluster URL: `cluster0.53oamx1.mongodb.net`
- [ ] MongoDB database: `tesla-shop`
- [ ] Railway account created (https://railway.app)
- [ ] Have GitHub repo link OR project files ready

## Step 1: Create Railway Project

- [ ] Log in to Railway Dashboard
- [ ] Click "New Project"
- [ ] Select deployment method:
  - [ ] "Deploy from GitHub" OR
  - [ ] "Empty Project" (manual upload)

## Step 2: Deploy Server Service

- [ ] Select/upload server code
- [ ] Wait for build to complete
- [ ] Status shows: ✅ **Running** (green)
- [ ] Check logs for errors
- [ ] Get server URL (e.g., `https://tesla-server-xxxxx.up.railway.app`)

**Environment Variables for Server:**
- [ ] `MONGODB_URI` = `mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0`
- [ ] `JWT_SECRET` = `random-key-min-32-chars`
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `3000`
- [ ] `CLIENT_URL` = `https://tesla-client-xxxxx.up.railway.app`

**Verification:**
- [ ] `/api/health` endpoint returns JSON
- [ ] MongoDB connection successful (check logs)
- [ ] No error logs

## Step 3: Deploy Client Service

- [ ] Select/upload client code (same project)
- [ ] Wait for build to complete
- [ ] Status shows: ✅ **Running** (green)
- [ ] Check logs for errors
- [ ] Get client URL (e.g., `https://tesla-client-xxxxx.up.railway.app`)

**Environment Variables for Client:**
- [ ] `VITE_API_URL` = `https://tesla-server-xxxxx.up.railway.app`

**Verification:**
- [ ] Homepage loads in browser
- [ ] No 404 errors
- [ ] No CORS errors in console

## Step 4: Link Services

- [ ] Client can call server API
- [ ] Update `VITE_API_URL` with actual server URL
- [ ] Redeploy client after URL change
- [ ] Test API calls in browser (F12 → Network)

## Step 5: MongoDB Configuration

- [ ] Go to MongoDB Atlas: https://cloud.mongodb.com
- [ ] Network Access section
- [ ] IP Whitelist includes: `0.0.0.0/0` (for testing)
  - For production: add specific Railway IPs
- [ ] Database Access has user: `tarshanvivek_db_user`
- [ ] User has correct password: `Tarsh_2106`

## Final Verification ✅

### Server API Test
- [ ] Open: `https://tesla-server-xxxxx.up.railway.app/api/health`
- [ ] Response shows:
  ```json
  {
    "status": "ok",
    "name": "TESLA API",
    "security": [...]
  }
  ```

### Client App Test
- [ ] Open: `https://tesla-client-xxxxx.up.railway.app`
- [ ] See TESLA marketplace homepage
- [ ] All images load
- [ ] Navigation works
- [ ] No console errors

### Cross-Service Communication
- [ ] Client makes API call to server
- [ ] Check browser Network tab (F12)
- [ ] API request goes to server URL
- [ ] Response is successful (200)
- [ ] No CORS errors

## Deployment Success Indicators ✅

- ✅ Both services show "Running" status
- ✅ Server URL responds to `/api/health`
- ✅ Client URL loads homepage
- ✅ No errors in Logs tab
- ✅ Client and server communicate
- ✅ MongoDB connected (see in logs)

## If Something Goes Wrong ❌

### Build Failed
- [ ] Check Build Logs
- [ ] Verify Dockerfile exists in correct directory
- [ ] Check for syntax errors in code
- [ ] Try "Redeploy"

### Service Not Starting
- [ ] Check Deploy Logs for errors
- [ ] Verify all required environment variables set
- [ ] Look for MONGODB_URI errors
- [ ] Try "Redeploy"

### Getting "Train hasn't arrived"
- [ ] Wait 10-15 minutes (first deploy is slow)
- [ ] Check if status shows "Deploying" (still building)
- [ ] If Failed: check Build Logs
- [ ] Verify MongoDB credentials are correct
- [ ] Check MongoDB Atlas is accessible

### MongoDB Connection Failed
- [ ] Verify MONGODB_URI in environment variables
- [ ] Test password: `Tarsh_2106`
- [ ] Check MongoDB Atlas IP whitelist
- [ ] Go to: MongoDB Atlas → Network Access → IP Whitelist
- [ ] Add: `0.0.0.0/0` for testing

### Client Can't Call Server
- [ ] Check `VITE_API_URL` environment variable
- [ ] Verify it matches actual server URL
- [ ] Redeploy client after changing URL
- [ ] Check browser console for CORS errors

## Post-Deployment

- [ ] App is live and accessible
- [ ] Monitor Logs for errors
- [ ] Test core features (login, product view, etc.)
- [ ] Check performance metrics
- [ ] Set up monitoring/alerts if needed

## Production Checklist

- [ ] Change `JWT_SECRET` to strong random value
- [ ] Set `NODE_ENV=production`
- [ ] Update `CLIENT_URL` to production domain
- [ ] Restrict MongoDB IP whitelist to Railway IPs only
- [ ] Enable HTTPS (Railway handles automatically)
- [ ] Set up error tracking/logging
- [ ] Configure backups for MongoDB
- [ ] Test all user workflows

---

**Congratulations!** Your TESLA marketplace is live on Railway! 🎉
