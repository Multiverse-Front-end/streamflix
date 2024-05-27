const key = process.env.REACT_APP_IMDB_API_KEY;

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export const moreOfGenre = (genreId) =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}&language=en-US`;

export const movieResponse = (id) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`;

export default requests;
