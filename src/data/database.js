import mongodb from "mongodb";
import dotnenv from "dotenv";

dotnenv.config();
const client = mongodb.MongoClient;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mzgug.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
let db;

export async function run(callback) {
  try {
    const _client = await client.connect(url, { useUnifiedTopology: true });
    db = _client.db();
    callback();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const getDb = () => {
  if (db) return db;
  throw "Database not found";
};
