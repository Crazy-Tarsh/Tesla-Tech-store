# 🚀 Deploy to Railway - Quick Start

Your TESLA marketplace is ready for Railway deployment!

## Prerequisites

- Railway account: https://railway.app (sign up free)
- Railway CLI: `npm install -g @railway/cli`

## Quick Deploy (3 steps)

### Step 1: Update `.env` file

Open `.env` and replace `[REDACTED]` with your actual MongoDB password `Tarsh_2106`:

```env
MONGODB_URI=mongodb+srv://tarshanvivek_db_user:Tarsh_2106@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=dev-secret-key-change-in-production-to-something-secure
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
```

### Step 2: Login to Railway

```powershell
railway login
```

This opens your browser to authorize. Follow the steps.

### Step 3: Deploy

```powershell
# Initialize Railway project
railway init

# Choose: Create a new project
# Project name: tesla-tech-store

# Set environment variables
railway variables set MONGODB_URI "mongodb+srv://tarshanvivek_db_user:Tarsh_2106@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0"
railway variables set JWT_SECRET "your-super-secret-key-min-32-chars-change-this"
railway variables set NODE_ENV "production"

# Deploy server
cd server
railway service add tesla-server
railway up

# In new PowerShell window, deploy client
cd ../client
railway service add tesla-client
railway up
```

## Get Your Live URLs

After deployment, Railway generates URLs:

```
Server: https://tesla-server-xxxxx.up.railway.app
Client: https://tesla-client-xxxxx.up.railway.app
```

Access them to see your live app!

## Update Client to Use Live API

The client needs to know the server URL. Set in Railway:

```powershell
railway variables set VITE_API_URL "https://tesla-server-xxxxx.up.railway.app"
```

Then redeploy client:

```powershell
cd client
railway up --build
```

## Files Ready for Railway

✅ `server/Dockerfile` - Multi-stage Node.js build
✅ `server/railway.json` - Railway configuration
✅ `client/Dockerfile` - React + Nginx build
✅ `client/railway.json` - Railway configuration
✅ `.env` - Environment variables (replace [REDACTED])
✅ `.dockerignore` - Build optimization

## No GitHub Required!

This setup uploads directly from your computer to Railway. No GitHub integration needed.

## Monitoring

```powershell
# View logs
railway logs -f

# Check status
railway status

# View variables
railway variables
```

## Redeploy After Code Changes

```powershell
# Update .env if needed
# Then:

cd server
railway up --build

cd ../client
railway up --build
```

## Troubleshooting

### MongoDB connection fails
1. Verify `.env` password is correct
2. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)
3. View logs: `railway logs -f`

### App won't start
```powershell
# SSH into container
railway shell

# Check environment
env | grep MONGODB

# Check logs
railway logs -f --tail=100
```

### Ports already in use
```powershell
# Get new Railway project
railway init
```

## Security Notes for Production

⚠️ Before deploying publicly:

1. Change `JWT_SECRET` to a random 32+ character string
2. Update `CLIENT_URL` to your custom domain
3. Rotate MongoDB credentials
4. Enable HTTPS (Railway does this automatically)
5. Set up backups for MongoDB

## Next Steps

1. ✅ Update `.env` with your password
2. ✅ Install Railway CLI
3. ✅ Run `railway login`
4. ✅ Run deployment commands above
5. ✅ Open your live URLs
6. ✅ Test the app

---

Questions? Check: https://docs.railway.app
