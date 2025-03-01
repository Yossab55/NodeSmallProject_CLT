const { MongoClient } = require("mongodb");
const dbURL =
  "mongodb+srv://yossabpro5:mmGlm9AUYPzoZXzq@cluster0.fwyba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(dbURL);
let db;
async function connectDB() {
  if(! db) {
    try {
      await client.connect();
      db = client.db("project_001_todoList");
    } catch (error){
      console.error("got error with connection : " + error);
    }
  }
  return db;
}
async function collectionConnection(dbName) {
  let db = await connectDB();
  return db.collection(dbName);
}
async function closeDB() {
  try {
    if(client) {
      await client.close();
      console.log("closed database");
    }
  } catch (error) {
    console.error("error on close " + error);
  }
}
module.exports = {collectionConnection, closeDB}