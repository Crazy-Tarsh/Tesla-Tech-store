import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error("❌ MONGODB_URI environment variable is missing!");
    console.error("Set it in .env.local, docker-compose.yml, or as an environment variable.");
    throw new Error("MONGODB_URI is required");
  }

  // Log first 50 chars of URI for debugging (hide password)
  const safeUri = uri.replace(/:[^@]+@/, ":***@");
  console.log(`📡 Connecting to MongoDB: ${safeUri}...`);

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      connectTimeoutMS: 15000,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:");
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes("unescaped characters")) {
      console.error("   Solution: Your password contains special characters that need URL encoding.");
      console.error("   Use: https://www.urlencoder.org/ to encode your password.");
      console.error("   Or use .env.local file instead of hardcoding the URI.");
    }
    
    if (error.message.includes("authentication failed")) {
      console.error("   Solution: Check your MongoDB username and password are correct.");
    }
    
    throw error;
  }
}
