import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_db");
    const movies = database.collection("samples");

    //query the movies
    const query = { title: "Divine Comedy" };
    const movie = await movies.findOne({});

    console.log(movie);
  } catch (err) {
    console.log(err);
  } finally {
    //ensuresclient will close wen u finish or error
    await client.close();
  }
}

// run().catch(console.dir)
run();
