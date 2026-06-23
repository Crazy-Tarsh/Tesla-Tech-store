# 🚀 Railway Deployment Guide - Direct Upload

## Step 1: Create Railway Account

1. Visit https://railway.app
2. Sign up with GitHub or email
3. Create a new project

## Step 2: Install Railway CLI

### Windows (PowerShell)
```powershell
npm install -g @railway/cli
```

### macOS/Linux
```bash
npm install -g @railway/cli
```

### Verify Installation
```bash
railway --version
```

## Step 3: Deploy to Railway

### Option A: Using Railway CLI (Recommended)

```powershell
# 1. Login to Railway
railway login

# 2. Create a new Railway project
railway init

# When prompted, select "Create a new project"
# Choose project name: tesla-tech-store

# 3. Connect your MongoDB Atlas URI
railway variables set MONGODB_URI "mongodb+srv://tarshanvivek_db_user:Tarsh_2106@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0"

# 4. Set other environment variables
railway variables set JWT_SECRET "your-super-secret-key-min-32-chars"
railway variables set NODE_ENV "production"
railway variables set CLIENT_URL "https://your-railway-app.up.railway.app"

# 5. Deploy server
cd server
railway up

# 6. Deploy client (in new terminal)
cd ../client
railway up
```

### Option B: Using Railway Dashboard (Web)

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Create New Project** → Select "Deploy from GitHub repo"
3. **Deploy Server**:
   - Name: `tesla-server`
   - Root Directory: `server`
   - Dockerfile: Select from list
   - Environment Variables (add):
     ```
     MONGODB_URI=mongodb+srv://tarshanvivek_db_user:Tarsh_2106@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0
     JWT_SECRET=your-secret-key
     NODE_ENV=production
     CLIENT_URL=https://your-client-url
     PORT=3000
     ```
4. **Deploy Client**:
   - Name: `tesla-client`
   - Root Directory: `client`
   - Dockerfile: Select from list
   - Set PORT to 80 or 3000

## Step 4: Configure Environment Variables

After deployment, set these in Railway Dashboard:

### Server Variables
```
MONGODB_URI=mongodb+srv://tarshanvivek_db_user:Tarsh_2106@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=<generate-a-strong-secret>
NODE_ENV=production
PORT=3000
CLIENT_URL=https://tesla-client.up.railway.app
COOKIE_EXPIRES_DAYS=1
SESSION_TIMEOUT_MINUTES=30
JWT_EXPIRES_IN=1d
```

### Client Variables
```
VITE_API_URL=https://tesla-server.up.railway.app
```

## Step 5: Link Services

1. Go to Railway Dashboard
2. Your Project → Settings
3. Add **Volume** for MongoDB (if needed)
4. Connect server to client via environment variables

## Step 6: Get Your URLs

After deployment completes:

- **Server API**: https://tesla-server-xxxx.up.railway.app
- **Client App**: https://tesla-client-xxxx.up.railway.app

## Troubleshooting

### Build Fails
```bash
# Check logs
railway logs

# Rebuild
railway up --build
```

### MongoDB Connection Error
1. Verify MongoDB Atlas IP whitelist allows Railway IPs
   - Go to MongoDB Atlas → Network Access
   - Add: 0.0.0.0/0 (or specific Railway IPs)
2. Check MONGODB_URI is correct
   ```bash
   railway variables
   ```

### App Won't Start
```bash
# View detailed logs
railway logs -f

# SSH into container
railway shell
```

## Direct File Upload (No GitHub)

If you prefer not to use GitHub:

1. **Compress your project**:
   ```powershell
   Compress-Archive -Path . -DestinationPath tesla-project.zip
   ```

2. **Upload to Railway**:
   - Railway Dashboard → New Project
   - Select "Upload from Computer"
   - Choose `tesla-project.zip`

3. **Configure**:
   - Set root directory
   - Add Dockerfile path
   - Configure environment variables

## Monitoring & Logs

### View Logs
```bash
railway logs -f
```

### View Status
```bash
railway status
```

### View Variables
```bash
railway variables
```

## Scaling

### Increase Resources
```bash
railway up --memory 2GB --cpu 2
```

### Multiple Instances
- Done automatically by Railway for high traffic

## Custom Domain

1. In Railway Dashboard → Settings
2. Add Custom Domain
3. Update DNS records with Railway's nameservers
4. Wait 24-48 hours for propagation

## Redeploy After Code Changes

### Using CLI
```bash
git add -A
git commit -m "Your changes"
railway up
```

### Using Dashboard
1. Go to Deployments
2. Select latest version
3. Click "Redeploy"

## Cost & Limits

- **Free Tier**: $5/month credit
  - Enough for small projects
  - Limited to specific regions
- **Pay-as-you-go**: After free credit runs out
  - Charged by usage (CPU, memory, bandwidth)

## Security Notes

⚠️ **IMPORTANT**:
1. Never commit `.env` files to Git
2. Use Railway's secret management for sensitive data
3. Rotate JWT_SECRET regularly
4. Use strong MongoDB password
5. Enable MongoDB IP whitelist restrictions in production

## Next Steps

1. ✅ Install Railway CLI
2. ✅ Login to Railway
3. ✅ Deploy server and client
4. ✅ Set environment variables
5. ✅ Test API endpoints
6. ✅ Access your live app

---

**Questions?** Check Railway docs: https://docs.railway.app
