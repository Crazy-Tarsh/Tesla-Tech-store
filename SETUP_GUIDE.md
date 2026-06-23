# 🔧 Setup Guide - MongoDB Atlas Integration

## Step 1: Update .env.local with Your MongoDB Credentials

Open `.env.local` and replace `[REDACTED]` with your actual MongoDB password:

**Before:**
```
MONGODB_URI=mongodb+srv://tarshanvivek_db_user:[REDACTED]@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0
```

**After (with actual password):**
```
MONGODB_URI=mongodb+srv://tarshanvivek_db_user:LGN7bGVZqyNfk2pq@cluster0.53oamx1.mongodb.net/tesla-shop?retryWrites=true&w=majority&appName=Cluster0
```

## Step 2: Start the Application

```bash
# Build and start all services
docker compose up -d

# View logs to confirm connection
docker compose logs server
```

**Expected output:**
```
server-1  | 📡 Connecting to MongoDB: mongodb+srv://tarshanvivek_db_user:***@cluster0...
server-1  | ✅ MongoDB connected successfully
server-1  | TESLA API running on http://localhost:5000
```

## Step 3: Verify Services

```bash
# Check all containers are healthy
docker compose ps

# Test API health endpoint
curl http://localhost:5000/api/health

# Access client
open http://localhost:3000
```

## Troubleshooting

### Error: "Password contains unescaped characters"

**Problem:** Special characters in your password aren't URL-encoded.

**Solution 1 (Recommended):** Use `.env.local` file (we're doing this already)

**Solution 2 (If hardcoding):** URL-encode your password:
- Visit: https://www.urlencoder.org/
- Paste your password: `LGN7bGVZqyNfk2pq`
- Copy encoded version and replace in connection string

### Error: "authentication failed"

**Causes:**
1. Wrong username in connection string
2. Wrong password
3. User not added to database in MongoDB Atlas

**Fix:**
1. Go to MongoDB Atlas → Database Access
2. Check user `tarshanvivek_db_user` exists
3. Verify password matches `.env.local`
4. Ensure IP whitelist allows your connection (or set to 0.0.0.0/0 for development)

### Error: "connection timed out"

**Causes:**
1. Network/firewall blocking MongoDB Atlas
2. Wrong cluster URL
3. MongoDB Atlas cluster paused

**Fix:**
1. Check MongoDB Atlas cluster is active (not paused)
2. Verify IP is whitelisted: Atlas → Network Access → IP Whitelist
3. Test connection manually:
   ```bash
   docker compose exec server mongosh "mongodb+srv://tarshanvivek_db_user:[password]@cluster0.53oamx1.mongodb.net/admin"
   ```

## Security Notes

⚠️ **NEVER commit `.env.local` to Git** - it contains your database password!

Already in `.gitignore`, but double-check:
```bash
grep "\.env" .gitignore
```

For production, use:
- GitHub Secrets for CI/CD
- Environment variables in your deployment platform (AWS, Heroku, DigitalOcean, etc.)
- Secret management tools (Vault, 1Password, LastPass)

## Files Modified

- ✅ `server/src/config/db.js` - Enhanced error messages and debugging
- ✅ `docker-compose.yml` - Uses `.env.local` via `env_file:`
- ✅ `.env.local` - Created with template (add your password)
- ✅ `SETUP_GUIDE.md` - This file

## Next Steps

1. ✏️ Edit `.env.local` and add your actual MongoDB password
2. 🐳 Run `docker compose up -d`
3. ✅ Check logs: `docker compose logs -f server`
4. 🌐 Open http://localhost:3000
5. 📤 Commit and push changes (except `.env.local`!)
