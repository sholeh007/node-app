import mongodb from "mongodb";

const mongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://sholeh:coba@cluster0.mzgug.mongodb.net/myproject?retryWrites=true&w=majority";
const db = mongoClient.connect(url, { useUnifiedTopology: true }); // ini return promise

export default db;
