# 🚀 Railway Deploy - Fixed Dockerfile Issue

## Problem
Railway couldn't find Dockerfile because it was looking in wrong path.

## Solution
Created `Dockerfile.server` and `Dockerfile.client` at project root.

## How to Deploy Now

### Step 1: Delete Old Deployments

Go to Railway Dashboard:
1. Your Project → Deployments
2. Delete any failed services
3. Start fresh

### Step 2: Create Server Service

1. **New Project** or use existing project
2. Click **"New Service"** → **"Empty Service"**
3. Name it: `tesla-server`
4. Go to **"Settings"**:
   - **Builder**: Select "Dockerfile"
   - **Dockerfile Path**: `Dockerfile.server`
   - **Port**: 5000
   - **Start Command**: `node src/server.js`

5. Go to **"Variables"** tab and add:
```
MONGODB_URI = mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET = random-secret-key-minimum-32-characters

NODE_ENV = production

PORT = 5000

CLIENT_URL = https://tesla-client-xxxxx.up.railway.app
```

6. Click **"Deploy"**
7. Wait for build (5-10 minutes)

### Step 3: Create Client Service

1. Same project → **"New Service"** → **"Empty Service"**
2. Name it: `tesla-client`
3. Go to **"Settings"**:
   - **Builder**: Select "Dockerfile"
   - **Dockerfile Path**: `Dockerfile.client`
   - **Port**: 80

4. Go to **"Variables"** tab and add:
```
VITE_API_URL = https://tesla-server-xxxxx.up.railway.app
```

5. Click **"Deploy"**
6. Wait for build (5-10 minutes)

### Step 4: Get Your URLs

After both services show ✅ **Running**:

1. Go to **"Deployments"**
2. Click each service
3. See **"Domain"** section with URL
4. Example:
   - Server: `https://tesla-server-prod-xxxxx.up.railway.app`
   - Client: `https://tesla-client-prod-xxxxx.up.railway.app`

### Step 5: Update Client URL with Server URL

1. **Client Service** → **Variables**
2. Edit `VITE_API_URL` to actual server URL
3. Click **"Redeploy"**
4. Wait 2-3 minutes

### Step 6: Test

**Server Health:**
```
https://tesla-server-xxxxx.up.railway.app/api/health
```

Should show:
```json
{
  "status": "ok",
  "name": "TESLA API"
}
```

**Client App:**
```
https://tesla-client-xxxxx.up.railway.app
```

Should show TESLA marketplace homepage

## Troubleshooting

### Build Still Fails
1. Check **Build Logs** for errors
2. Common issues:
   - Wrong Dockerfile path (use: `Dockerfile.server` or `Dockerfile.client`)
   - Missing dependencies
   - Port conflicts

**Solution:**
- Try redeploy
- Check logs in detail
- Verify all env variables set

### MongoDB Connection Fails
1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Network Access → IP Whitelist
3. Make sure `0.0.0.0/0` is added (allow all IPs)
4. Or add specific Railway IPs

### Client Can't Call Server
1. Update `VITE_API_URL` with actual server URL
2. Redeploy client
3. Check browser console (F12)
4. No CORS errors should appear

## Files Provided

- ✅ `Dockerfile.server` - Server build
- ✅ `Dockerfile.client` - Client build  
- ✅ `railway.json` - Railway configuration
- ✅ `.env` - Environment template

## Quick Checklist ✅

- [ ] Delete old failed deployments
- [ ] Create new empty services
- [ ] Set Dockerfile path: `Dockerfile.server` and `Dockerfile.client`
- [ ] Add all environment variables
- [ ] Deploy both services
- [ ] Wait for ✅ Running status
- [ ] Get URLs from Deployments
- [ ] Update client VITE_API_URL with server URL
- [ ] Redeploy client
- [ ] Test both URLs

Done! Your app is live! 🎉
