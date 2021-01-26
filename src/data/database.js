import mongodb from "mongodb";

const client = mongodb.MongoClient;
const username = "sholeh";
const password = "coba";
const database = "shop";
const url = `mongodb+srv://${username}:${password}@cluster0.mzgug.mongodb.net/${database}?retryWrites=true&w=majority`;
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
