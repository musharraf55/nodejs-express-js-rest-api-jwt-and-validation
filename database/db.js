import mongoose from "mongoose";
const Connection = async (username, password) => {
  //const URL = `mongodb://${username}:${password}@crud-app-shard-00-00.fyf2n.mongodb.net:27017,crud-app-shard-00-01.fyf2n.mongodb.net:27017,crud-app-shard-00-02.fyf2n.mongodb.net:27017/CRUD-APPLICATION?ssl=true&replicaSet=atlas-rz0rvg-shard-0&authSource=admin&retryWrites=true&w=majority`
  const URI = process.env.DB_URI;
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error: Database Not Connected ", error.message);
  }
};

export default Connection;
