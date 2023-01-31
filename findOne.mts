import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

interface IMDB<T> {
  rating: T;
  votes: T;
  id: T;
}

 interface Movie {
  title: string;
  year: number;
  released: Date;
  plot: string;
  type: "movie" | "series";
  imdb: IMDB<number>;
}

//destructure "title" n "imdb" from Movie
type MovieSummary = Pick<Movie, "title" | "imdb">;

async function run() {
  try {
    const database = client.db("sample_db");
    const movies = database.collection("movies");
    // const movies = database.collection("samples");

    //query the movies
    const query = { title: "Divine Comedy" };

    //passing movie summary to cover the types of the result
    const movie = await movies.findOne<MovieSummary>(
      //find movie with title "The Room"
      { title: "The Room" },
      {
        sort: {
          rating: -1,
        },
        projection: {
          _id: 0,
          title: 1,
          imdb: 1,
        },
        //result should show title n imdb but not _id
      }
    );

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

export{}