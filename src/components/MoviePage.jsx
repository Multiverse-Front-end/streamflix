import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Carousel from "./Carousel";
import Movie from "./Movie";
import { moreOfGenre, movieResponse } from "../Resquest";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(movieResponse(id));
      setMovie(response.data);
      fetchSimilarMovies(response.data.genres[0].id);
    };

    const fetchSimilarMovies = async (genreId) => {
      const response = await axios.get(moreOfGenre(genreId));
      setSimilarMovies(response.data.results);
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (user?.email) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const savedShows = docSnap.data().savedShows || [];
          const isSaved = savedShows.some((savedShow) => savedShow.id === id);
        }
      }
    };

    checkIfSaved();
  }, [user, id]);

  return (
    <div className="text-white px-4 md:px-8 bg-black min-h-screen pt-28">
      <div className="flex flex-col md:flex-row items-start">
        <img
          className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
          alt={movie.title || "Default Movie"}
        />
        <div className="md:ml-8 mt-4 md:mt-0 md:flex-1">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-sm text-gray-400 mt-2">{movie.release_date}</p>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8">More of the same</h2>
      <Carousel rowID={similarMovies}>
        {similarMovies.map((item) => (
          <Movie key={item.id} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default MoviePage;
