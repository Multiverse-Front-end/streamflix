import React from 'react';

const MovieDetails = ({ item, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50'>
      <div className='bg-white rounded-lg p-6 max-w-md mx-auto relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl'
        >
          &times;
        </button>
        <img
          className='w-full h-auto mb-4'
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title}
        />
        <h2 className='text-2xl font-bold mb-2'>{item?.title}</h2>
        <p className='text-gray-700 mb-4'>{item?.overview}</p>
        <p className='text-gray-500'>Release Date: {item?.release_date}</p>
      </div>
    </div>
  );
};

export default MovieDetails;