# 🔧 Complete Railway Troubleshooting Guide

## "Application failed to respond" - What It Means

Your Railway service crashed or won't start. Common causes:

1. **MongoDB can't connect** (80% of issues)
2. Environment variables missing
3. Port already in use
4. Application crash

---

## Step 1: Check Build Status

1. Go to: https://railway.app/dashboard
2. Click your **Server service**
3. Look at status badge:
   - ✅ **Running** (green) = Service started
   - 🔴 **Failed** (red) = Build or start failed
   - ⏳ **Deploying** = Still building
   - ❌ **Crashed** = Crashed after starting

---

## Step 2: Read the Logs

1. Click service
2. Go to **"Logs"** tab (right side)
3. Scroll to bottom and read last 50 lines
4. Look for error messages

### What to Look For

```bash
# Good signs:
✅ MongoDB connected successfully
✅ TESLA API running on http://localhost:5000
GET /api/health 200

# Bad signs:
❌ MONGODB_URI is required
❌ authentication failed
❌ connect ECONNREFUSED
❌ Error: Cannot find module
```

---

## Step 3: Fix by Error Type

### Error: "MONGODB_URI is required"

**Cause**: Environment variable not set

**Fix**:
1. Service → **"Variables"** tab
2. Click **"+ New Variable"**
3. Add: `MONGODB_URI = mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0`
4. Click outside to save
5. Service → **"Redeploy"**

### Error: "authentication failed"

**Cause**: MongoDB password wrong or user doesn't exist

**Fix**:
1. Go to: https://cloud.mongodb.com
2. Click **"Database Access"** (left menu)
3. Find user: `tarshanvivek_db_user`
4. Check if password is `Tarsh_2106`
5. If wrong, click Edit → Change password
6. Update MONGODB_URI in Railway
7. Redeploy

### Error: "connect ECONNREFUSED" or "Timeout"

**Cause**: MongoDB IP not whitelisted or cluster offline

**Fix**:
1. Go to: https://cloud.mongodb.com
2. Click **"Network Access"** (left menu)
3. See list of whitelisted IPs
4. If Railway IP not there, click **"Add IP Address"**
5. Choose **"0.0.0.0/0"** (allow all - for testing)
6. Click **"Confirm"**
7. ⏳ Wait 1-2 minutes
8. Railway → Redeploy

### Error: "Cannot find module 'express'" or similar

**Cause**: npm install didn't run or failed

**Fix**:
1. Check **Build Logs** (different from Logs tab)
   - Service → **"Deployments"** → Click build
2. Look for `npm install` errors
3. Common fix: Rebuild with no cache
   - Service → **"Redeploy"**

### Error: "Port 5000 already in use"

**Cause**: Port conflict in container

**Fix**:
1. Service → **"Variables"** tab
2. Make sure `PORT` is set to `5000`
3. If it's not, add: `PORT = 5000`
4. Redeploy

### Error: "Command failed: node src/server.js"

**Cause**: Application crash on startup

**Fix**:
1. Check all environment variables are set
2. Verify MONGODB_URI is correct
3. Check package.json has all dependencies
4. Try redeploy with no cache

---

## Step 4: If Still Failing

### Option A: SSH into Container

If available:

```bash
railway shell

# Check environment
env | grep MONGODB

# Check file structure
ls -la /app/src

# Try to start server manually
node src/server.js
```

### Option B: Redeploy from Scratch

1. Delete service: Settings → Delete
2. Create new service with same name
3. Add all variables again
4. Deploy

### Option C: Test Locally First

Before re-deploying:

```bash
# On your Windows machine
docker compose down
docker compose build --no-cache
docker compose up -d
docker compose logs server
```

If it fails locally same way, fix locally first, then push to GitHub and redeploy.

---

## Complete Checklist to Fix

- [ ] MongoDB IP whitelist allows `0.0.0.0/0` (or Railway IPs)
- [ ] MONGODB_URI variable set in Railway
- [ ] JWT_SECRET variable set
- [ ] NODE_ENV = production
- [ ] PORT = 5000 (server) or 80 (client)
- [ ] CLIENT_URL set (for server)
- [ ] VITE_API_URL set (for client, if using it)
- [ ] Service clicked **"Redeploy"** button
- [ ] Waited 5-10 minutes for new build
- [ ] Checked Logs tab for errors
- [ ] No "failed" or "error" messages in logs

---

## Railway Specific Tips

### 1. Environment Variables Are Case-Sensitive
```
MONGODB_URI ✅ (correct)
mongodb_uri ❌ (wrong - Node won't find it)
MongoDBURI ❌ (wrong)
```

### 2. Redeploy Takes Time
- First deploy: 10-15 minutes
- Rebuilds: 5-10 minutes
- Wait the full time before assuming it failed

### 3. Logs Update in Real-Time
- Keep Logs tab open
- Refresh browser if you don't see updates
- New deployments show new logs

### 4. Try the "Easy Deploy" Path

If confused, start over:
1. Delete service
2. Create new: "Deploy from GitHub"
3. Select Dockerfile
4. Let it auto-detect and suggest variables
5. Fill in values
6. Deploy

---

## Debug Commands (If Using CLI)

```bash
# Check if logged in
railway whoami

# See project info
railway project

# View current logs
railway logs -f --tail=50

# SSH into container
railway shell

# Check environment inside container
railway shell
$ env | grep MONGODB
$ node -e "console.log(process.env.MONGODB_URI)"

# Exit container
$ exit
```

---

## MongoDB Atlas Verification

Before debugging Railway, verify MongoDB itself:

1. Go to: https://cloud.mongodb.com
2. Click **"Databases"** (left menu)
3. Find your cluster: `cluster0`
4. Should show status: **"Active"** (green)
5. If paused, click **"Resume"**

6. Go to **"Network Access"**
7. See whitelisted IPs
8. If Railway IP not there, add `0.0.0.0/0`

---

## Still Stuck?

If you've tried everything above:

1. Share **exact error** from Logs tab
2. Share your MongoDB credentials confirm (username, password)
3. Tell me:
   - Which environment variables are set in Railway
   - What the server logs say
   - Whether you can connect locally

Then I can give specific fix!

---

## Success Verification

After all fixes, you should see:

**In Logs:**
```
📡 Connecting to MongoDB: mongodb+srv:***@cluster0...
✅ MongoDB connected successfully
✅ TESLA API running on http://localhost:5000
[0mGET /api/health [32m200[0m 1.215 ms - 131[0m
```

**Status**: ✅ **Running** (green)

**Open URL**: `https://tesla-server-xxxxx.up.railway.app/api/health`
Should return JSON: `{"status":"ok","name":"TESLA API",...}`

**All correct?** Deploy client and you're done! 🎉

---

**Start with Step 1 (MongoDB IP whitelist). That fixes 80% of issues!**
