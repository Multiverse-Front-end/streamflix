import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import MovieDetails from './MovieDetails';

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const [showDetails, setShowDetails] = useState(false);

  const movieID = doc(db, 'users', `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          backdrop_path: item.backdrop_path,
          overview: item.overview, 
          release_date: item.release_date 
        }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  };

  const handleImageClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <div
        className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'
        onClick={handleImageClick}
      >
        <img
          className='w-full h-auto block'
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
          <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
            {item?.title}
          </p>
          <p onClick={(e) => { e.stopPropagation(); saveShow(); }}>
            {like ? (
              <FaHeart className='absolute top-4 left-4 text-gray-300' />
            ) : (
              <FaRegHeart className='absolute top-4 left-4 text-gray-300' />
            )}
          </p>
        </div>
      </div>
      {showDetails && <MovieDetails item={item} onClose={() => setShowDetails(false)} />}
    </>
  );
};

export default Movie;