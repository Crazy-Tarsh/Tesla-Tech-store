# ⚡ Railway Deployment - Simplest Way

## You're Getting "Train hasn't arrived" Because:

The service didn't build successfully or environment variables weren't set.

## Here's What to Do RIGHT NOW:

### 1. Go to Your Railway Dashboard
https://railway.app/dashboard

### 2. Click on Your Project
Look for "tesla-tech-store" (or create one if not there)

### 3. For EACH Service (server + client):

**A) Check Deployment Status**
- Status should say: ✅ "Running" (green)
- If it says ⏳ "Deploying", wait 10 minutes
- If it says ❌ "Failed", continue to step B

**B) If Deployment Failed:**
1. Click the service name
2. Go to **"Logs"** tab
3. Read the error message
4. Most common: Missing `MONGODB_URI` environment variable

**C) Set Environment Variables**
1. Click service
2. Go to **"Variables"** tab
3. Add each variable:

```
Key: MONGODB_URI
Value: mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0
```

```
Key: JWT_SECRET
Value: dev-secret-key-change-in-production-to-random-string
```

```
Key: NODE_ENV
Value: production
```

```
Key: PORT
Value: 3000
```

**For CLIENT only, add:**
```
Key: VITE_API_URL
Value: https://tesla-server-xxxxx.up.railway.app
```
(Replace xxxxx with actual server URL)

**D) Redeploy**
1. Click **"Redeploy"** button
2. Wait 5-10 minutes
3. Check status

### 4. Get Your URLs

1. Dashboard → Your Project
2. Click each Service
3. Look for **"Domain"** section
4. Should show: `https://tesla-server-xxxxx.up.railway.app`

### 5. Test It Works

**Test Server API:**
```
https://tesla-server-xxxxx.up.railway.app/api/health
```

Should show:
```json
{
  "status": "ok",
  "name": "TESLA API",
  ...
}
```

**Test Client:**
```
https://tesla-client-xxxxx.up.railway.app
```

Should show: TESLA Marketplace homepage

## If Still Stuck

### Check Logs
1. Service → **Logs** tab
2. Search for "error" or "failed"
3. Common issues:

**Error: "MONGODB_URI is required"**
→ Didn't set environment variable. Do Step 3C above.

**Error: "MongoDB connection failed"**
→ Wrong password or MongoDB Atlas IP whitelist issue.
Go to MongoDB Atlas → Network Access → Allow 0.0.0.0/0

**Error: "Port already in use"**
→ Set PORT environment variable to 3000

**Error: "Dockerfile not found"**
→ Set root directory correctly in Railway settings

### SSH into Service to Debug

1. Service → **Settings**
2. Scroll down → **"Shell"** button
3. Run commands:

```bash
# Check environment variables
env | grep MONGODB

# Check if MongoDB connects
node -e "console.log(process.env.MONGODB_URI)"

# Check file structure
ls -la /app/src
```

### Still Not Working?

Share the exact error from the **Logs** tab and I'll fix it.

---

## Quick Checklist ✅

- [ ] Server service status: Running
- [ ] Client service status: Running
- [ ] MONGODB_URI environment variable set
- [ ] JWT_SECRET environment variable set
- [ ] Server URL works: `/api/health` returns JSON
- [ ] Client URL loads homepage
- [ ] No errors in Logs tab

Once all checked, you're live! 🚀
