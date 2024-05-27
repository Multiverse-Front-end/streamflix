import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import Carousel from "./Carousel";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <Carousel rowID={rowID}>
        {movies.map((item, id) => (
          <Movie key={id} item={item} />
        ))}
      </Carousel>
    </>
  );
};

export default Row;
