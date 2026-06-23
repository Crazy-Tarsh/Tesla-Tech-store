# 🚨 Railway Deployment Failed - Quick Fix

## Most Likely Cause: MongoDB IP Whitelist

Railway runs from a cloud IP that's not whitelisted in MongoDB Atlas.

## Fix in 3 Steps

### Step 1: Add IP Whitelist to MongoDB Atlas

1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Click **"Network Access"** (left menu)
4. Click **"Add IP Address"** button
5. Select **"0.0.0.0/0"** (allow all IPs - for testing)
6. Click **"Confirm"**
7. ⏳ Wait 1-2 minutes for changes to propagate

### Step 2: Redeploy on Railway

1. Go to: https://railway.app/dashboard
2. Click your **Server service**
3. Click **"Redeploy"** button (top right)
4. ⏳ Wait for build (5-10 minutes)
5. Watch **"Logs"** tab for:
   ```
   ✅ MongoDB connected successfully
   ✅ TESLA API running on http://localhost:5000
   ```

### Step 3: Test

1. Open Server URL from Domain box: `https://tesla-server-xxxxx.up.railway.app/api/health`
2. Should show: `{"status":"ok","name":"TESLA API",...}`
3. If working, also redeploy client

---

## Other Possible Issues

### Issue 1: Wrong MongoDB URI

**Check:**
1. Service → **Variables** tab
2. Look at `MONGODB_URI`
3. Should be: `mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0`

**Fix if wrong:**
- Click variable to edit
- Paste correct URI
- Click outside to save
- Redeploy

### Issue 2: Missing Environment Variables

**Check what's set:**
1. Service → **Variables** tab
2. Should have these 5 variables:
   - ✅ MONGODB_URI
   - ✅ JWT_SECRET
   - ✅ NODE_ENV
   - ✅ PORT
   - ✅ CLIENT_URL

**If missing:**
- Add missing variables
- Redeploy

### Issue 3: Port Conflict

**Fix:**
1. Service → Variables tab
2. Ensure PORT is set to 5000 (server) or 80 (client)
3. Redeploy

---

## Check Logs for Exact Error

1. Go to Service in Railway
2. Click **"Logs"** tab
3. Look for lines with:
   - "error"
   - "failed"
   - "cannot connect"
   - "ECONNREFUSED"
   - "authentication failed"

### Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `MONGODB_URI is required` | Missing env var | Add to Variables |
| `authentication failed` | Wrong password | Check credentials |
| `connect ECONNREFUSED` | MongoDB IP not whitelisted | Add `0.0.0.0/0` to Atlas |
| `Port 5000 already in use` | Port conflict | Set PORT=3000 |
| `Cannot find module` | Missing dependency | Check package.json |

---

## Nuclear Option: Full Redeploy

If still not working:

1. **Delete old services**
   - Click each service → Settings → Delete
   - Confirm deletion

2. **Create fresh deployment**
   - New Project → GitHub repo → Dockerfile.server → Deploy
   - Wait for build
   - Add variables
   - Test

3. **Share error** from Logs tab

---

## Success Indicators

After redeploy, you should see in Logs:

```
📡 Connecting to MongoDB: mongodb+srv:***@cluster0...
✅ MongoDB connected successfully
✅ TESLA API running on http://localhost:5000
GET /api/health 200
```

Service status: ✅ **Running** (green)

---

## Quick Commands

If using Railway CLI:

```bash
# View logs
railway logs -f

# Check status
railway status

# Redeploy
railway up --no-cache

# SSH into container
railway shell
```

---

**Do Step 1 (MongoDB whitelist) now!** That's the most common fix. Then redeploy and check again. 🚀
