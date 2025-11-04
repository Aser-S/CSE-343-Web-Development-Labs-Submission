// Use toaster for errors

import React from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import "./styles.css";

const IMDBapiKey = "API-KEY"; // replace with your real key
//const IMDBapiKey = 0;
function InputMovie(props) {
  const movies = props.movies;
  const setter = props.setter;
  const [movieName, setMovieName] = React.useState();
  const [movieComment, setMovieComment] = React.useState();
  const [movieRating, setMovieRating] = React.useState();

  function AddMovie() {
    if (!movieName) {
      toast.error("No Name Chosen");
      return;
    }

    if (movieRating < 0 || movieRating > 5 || isNaN(movieRating)) {
      toast.error("Rating must be a number from 0 and 5 ⭐");
      return;
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
      movieName
    )}&apikey=${IMDBapiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const imageUrl =
          data.Poster && data.Poster !== "N/A"
            ? data.Poster
            : "https://via.placeholder.com/200x300?text=No+Image";

        props.setter([
          ...props.movies,
          {
            name: movieName,
            comment: movieComment,
            numberOfStars: movieRating,
            image: imageUrl,
          },
        ]);

        setMovieName("");
        setMovieComment("");
        setMovieRating("");
      })
      .catch((err) => {
        console.error("Error fetching movie image:", err);
      });
  }

  return (
    <>
      <div>
        <input
          placeholder="Enter Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)} // input
        />
      </div>
      <div>
        <input
          placeholder="Enter Comment"
          value={movieComment}
          onChange={(e) => setMovieComment(e.target.value)} // input
        />
      </div>
      <div>
        <input
          placeholder="Enter Rating in number of stars out of 5"
          value={movieRating}
          onChange={(e) => setMovieRating(e.target.value)} // input
        />
      </div>
      <button onClick={AddMovie} type="submit">
        Add
      </button>
    </>
  );
}

function MoviesList(props) {
  const movies = props.movies;
  const setArray = props.setter;

  function deleteMovie(name) {
    setArray(movies.filter((m) => m.name !== name));
  }

  return (
    <div>
      {movies.map((movie) => (
        <div className="movie-card" key={movie.name}>
          <img
            src={movie.image}
            alt={movie.name}
            style={{
              width: "120px",
              height: "180px",
              borderRadius: "0.5rem",
              objectFit: "cover",
              marginBottom: "0.5rem",
            }}
          />
          <div>
            <strong>{movie.name}</strong>
          </div>
          <div className="comment">"{movie.comment}"</div>
          <div className="rating">
            ⭐ {movie.numberOfStars}
            <button onClick={() => deleteMovie(movie.name)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [moviesArray, setArray] = React.useState([
    // name: "Placeholder Movie",
    // comment: "Good",
    // numberOfStars: 5,
  ]);
  return (
    <div class="container">
      <h1>Movies Watched</h1>
      <InputMovie movies={moviesArray} setter={setArray} />
      <MoviesList movies={moviesArray} setter={setArray} />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
