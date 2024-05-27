import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import MovieDetails from "./MovieDetails";
import Carousel from "./Carousel";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <Carousel rowID="savedShows">
        {movies.map((item) => (
          <div
            key={item.id}
            className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            onClick={() => setSelectedMovie(item)}
          >
            <img
              className="w-full h-auto block"
              src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
              alt={item?.title}
            />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
              <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                {item?.title}
              </p>
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  deleteShow(item.id);
                }}
                className="absolute text-gray-300 top-4 right-4"
              >
                <AiOutlineClose />
              </p>
            </div>
          </div>
        ))}
      </Carousel>
      {selectedMovie && (
        <MovieDetails
          item={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
};

export default SavedShows;
