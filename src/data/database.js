import mongodb from "mongodb";

const client = mongodb.MongoClient;
const url =
  "mongodb+srv://sholeh:coba@cluster0.mzgug.mongodb.net/myproject?retryWrites=true&w=majority";

async function run(callback) {
  try {
    const db = await client.connect(url, { useUnifiedTopology: true });
    callback(db);
  } catch (err) {
    console.error(err);
  }
}

export default run;
