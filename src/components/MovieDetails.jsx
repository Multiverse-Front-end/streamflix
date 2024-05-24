import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const MovieDetails = ({ item, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50'>
      <div className='bg-black rounded-lg p-6 max-w-md mx-auto relative'>
          <p onClick={onClose} className='absolute text-red-500 top-2 right-2'><AiOutlineClose /></p>
        <img
          className='w-full h-auto mb-4'
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <h2 className='text-white font-bold mb-2'>{item?.title}</h2>
        <p className=' text-white mb-4'>{item?.overview}</p>
        <p className=' text-white'>Release Date: {item?.release_date}</p>
      </div>
    </div>
  );
};

export default MovieDetails;