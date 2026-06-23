# 🚀 Railway Deploy - Click by Click Guide

## If You See "No Active Deployment"

This means Railway hasn't started building yet.

## FIX: Manually Trigger Build

### For Server Service

1. **Go to**: https://railway.app/dashboard
2. **Click** your project name
3. **Click** the `tesla-server` service
4. **Click** the **"Deploy"** button (top right)
5. Select **"GitHub Repo"** (if connected) OR
6. Click **"Redeploy Latest Commit"**
7. Wait and watch the logs appear

### For Client Service

1. **Same project** → Click `tesla-client` service
2. Click **"Deploy"** button
3. Select deployment source
4. Wait for build to start

## If Still No Build

Railway needs to connect to your code. Choose ONE:

### Option A: Connect GitHub Repo

1. Service → **Settings** (gear icon)
2. Scroll to **"Repository"** section
3. Click **"Connect Repository"**
4. Select your GitHub repo: `Crazy-Tarsh/Tesla-Tech-store`
5. Click **"Deploy"**

### Option B: Upload Code Manually

1. **New Project** → **"Upload from Computer"**
2. Zip your project: `Tesla-project.zip`
3. Upload the ZIP
4. Railway extracts and detects Dockerfiles
5. Click **"Deploy"**

### Option C: Use Railway CLI

```powershell
npm install -g @railway/cli
railway login
railway init
cd server
railway service add
railway up
```

## After Deployment Starts

You should see:

1. **Build Logs** start appearing
2. Shows: `Building...` with progress
3. After ~5-10 min: Shows `Running` (green checkmark)
4. URL appears in **Domain** section

## Troubleshooting Build Issues

### Issue 1: "No Dockerfile found"

**Fix:**
1. Service → **Settings**
2. Find **"Dockerfile Path"** field
3. Enter: `Dockerfile.server` (for server) or `Dockerfile.client` (for client)
4. Click **"Save"**
5. Click **"Deploy"**

### Issue 2: "Build failed - npm install error"

**Fix:**
1. Check `package.json` exists in correct location
2. Verify dependencies are correct
3. View full error in **Build Logs**
4. Make code fix locally
5. Push to GitHub or re-upload
6. Redeploy

### Issue 3: Still says "No active deployment"

**Try this:**

1. Service → **Settings**
2. Look for **"Deploy on push"** toggle
3. Make sure it's **enabled** (toggle ON)
4. Go back to **Deployments** tab
5. Click **"Redeploy"** button manually

## Getting Live URLs

Once service shows ✅ **Running**:

1. Click service
2. Look for **"Domain"** box at top
3. Shows: `https://tesla-server-xxxxx.up.railway.app`
4. Copy this URL

## Complete Deployment Flow

```
1. Service created (empty)
   ↓
2. Select deployment source (GitHub/Manual)
   ↓
3. Railway detects Dockerfile
   ↓
4. Click "Deploy" 
   ↓
5. Build starts (shows in Logs)
   ↓
6. Build completes (5-10 minutes)
   ↓
7. Service shows "Running" ✅
   ↓
8. Domain URL appears
   ↓
9. Open URL in browser - App is live! 🎉
```

## Quick Checklist

- [ ] Service created with name
- [ ] Dockerfile path set correctly
- [ ] Clicked "Deploy" button
- [ ] Logs showing build activity
- [ ] Status changed to "Running"
- [ ] Domain URL visible
- [ ] Can open URL in browser

## Still Stuck?

Share a screenshot or tell me:
1. Service name (server or client)
2. Current status (Building/Running/Failed)
3. Any error messages in Logs
4. Whether you're using GitHub or manual upload

Then I can give you exact next steps!

---

**Remember**: First deploy takes 10-15 minutes. Be patient!
