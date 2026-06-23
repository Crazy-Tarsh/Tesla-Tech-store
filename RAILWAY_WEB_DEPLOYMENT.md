# 🚀 Railway Web Dashboard Deployment - Step by Step

## Step 1: Go to Railway Dashboard

Open: https://railway.app/dashboard

## Step 2: Create New Project

1. Click **"New Project"** button
2. Select **"Deploy from GitHub repo"** 
   - *OR* **"Empty Project"** if you prefer manual upload

## Step 3: Deploy Server Service

### Option A: From GitHub
1. Select your `Tesla-Tech-store` repository
2. Click **"Deploy"**
3. Railway auto-detects the Dockerfile in `/server`

### Option B: Manual Upload
1. Create a ZIP of the entire project
2. New Project → Upload → Select ZIP
3. Set root directory to `.`

## Step 4: Configure Server Service

After server is selected:

1. **Settings** tab
2. **Environment** section → Add these variables:

```
MONGODB_URI = mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET = your-random-secret-key-minimum-32-characters

NODE_ENV = production

PORT = 3000

CLIENT_URL = https://your-client-url.up.railway.app
```

3. Click **"Deploy"** button

## Step 5: Deploy Client Service

1. In same project, click **"New Service"**
2. Select **"GitHub repo"** or **"Upload"**
3. Configure:

**Environment Variables:**
```
VITE_API_URL = https://your-server-url.up.railway.app
```

4. Click **"Deploy"**

## Step 6: Get Your URLs

After deployment completes (5-10 minutes):

1. Go to **Project** → **Deployments**
2. For each service, click to see the generated URL
3. Example:
   - Server: `https://tesla-server-prod-xxxxx.up.railway.app`
   - Client: `https://tesla-client-prod-xxxxx.up.railway.app`

## Step 7: Link Services

Update Client's `VITE_API_URL` with actual Server URL:

1. Client Service → **Settings**
2. **Environment Variables**
3. Edit `VITE_API_URL` = your server URL
4. **Redeploy**

## Troubleshooting Deployment

### Build Fails
1. Check **Build Logs**
2. Common issues:
   - Missing Dockerfile
   - Wrong directory path
   - Port already in use

**Fix:**
```
Set PORT environment variable to 3000 or 5000
```

### Service Not Starting
1. Check **Deploy Logs**
2. Look for MONGODB_URI error
3. Verify MongoDB credentials are correct

**Test MongoDB connection:**
```bash
# SSH into container
railway shell

# Check env vars
env | grep MONGODB

# Try connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected')).catch(e => console.log('❌', e.message))"
```

### Still Getting "Train hasn't arrived"
This means the service is still deploying or failed to start.

**Solutions:**
1. Wait 10-15 minutes (first deploy takes time)
2. Check **Logs** tab for errors
3. Verify all environment variables are set
4. Redeploy:
   - Service → **Redeploy**
   - Or make a code change and push to trigger auto-deploy

## Check Deployment Status

1. Dashboard → **Deployments**
2. Look for status badges:
   - ✅ **Success** = Running
   - ⏳ **In Progress** = Still building
   - ❌ **Failed** = Check logs

## View Logs

**Real-time logs:**
1. Service → **Logs** tab
2. See build and runtime errors

**Common errors:**
```
ECONNREFUSED = Port not available
ENOENT = File not found
TypeError: Cannot read property... = Missing env variable
```

## MongoDB Connection Issues

If MongoDB fails:

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Network Access → IP Whitelist
3. Add: **0.0.0.0/0** (allows all IPs)
   - ⚠️ For production, use specific IPs

4. Verify connection string:
   - Username: `tarshanvivek_db_user`
   - Password: `Tarsh_2106`
   - Cluster: `cluster0.53oamx1.mongodb.net`
   - Database: `tesla-shop`

## Custom Domain (Optional)

After services are running:

1. Service → **Settings** → **Domain**
2. Add custom domain (e.g., `api.yoursite.com`)
3. Update DNS records
4. Wait 24 hours for propagation

## Monitor Your App

1. Dashboard → Your Project
2. Check:
   - CPU usage
   - Memory usage
   - Network activity
   - Restart count
   - Logs

## Scaling (If Needed)

1. Service → **Settings**
2. **Deploy** section
3. Increase:
   - CPU (default 0.5)
   - RAM (default 512MB)

## Cost

Railway free tier: $5/month credit
- Enough for small projects
- No credit card required for testing

After $5 spent: Pay-as-you-go pricing

## Success Indicators ✅

- ✅ Both services show status: **Running**
- ✅ Logs show no errors
- ✅ Server URL responds with JSON at `/api/health`
- ✅ Client URL loads HTML homepage
- ✅ Client can call server API

## Final Test

Once deployed:

1. Open Client URL in browser
2. Should see TESLA marketplace
3. Check browser console (F12)
4. No CORS errors or 404s

If you see the marketplace = **Success!** 🎉

---

**Still stuck?** Try these commands in Railway shell:

```bash
# Check environment
env | grep MONGODB_URI

# Test MongoDB
mongosh $MONGODB_URI

# Check port
netstat -an | grep 3000

# Check files
ls -la /app/src
```

Then share the error output for debugging.
