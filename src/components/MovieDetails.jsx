import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const MovieDetails = ({ item, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50'>
      <div className='bg-black rounded-lg p-6 max-w-3xl w-full mx-4 relative overflow-hidden'>
          <p onClick={onClose} className='absolute text-white top-1 right-1'><AiOutlineClose size={24} /></p>
        <img
          className='w-full h-auto mb-4'
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <h2 className='text-white font-bold text-2xl mb-2'>{item?.title}</h2>
        <p className=' text-white mb-4 max-w-auto overflow-y-auto whitespace-normal break-words' >{item?.overview}</p>
        <p className=' text-white'>Release Date: {item?.release_date}</p>
      </div>
    </div>
  );
};

export default MovieDetails;