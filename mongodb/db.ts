import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@globo-speak.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

if (!connectionString) {
  throw new Error(
    "Please define the Mongo DB username and password in the environment variables"
  );
}

const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    console.log("---- Already connected to MongoDB ----");
    return;
  }

  try {
    await mongoose.connect(connectionString);
    console.log("---- Connected to MongoDB ----");
  } catch (err) {
    console.error("Could not connect to MongoDB:", err);
  }
};

export default connectDB;
