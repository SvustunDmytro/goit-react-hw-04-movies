import axios from 'axios';

const popularMoviesURL =
  'https://api.themoviedb.org/3/trending/all/day?api_key=7bacf57019a3c7657cb80da01b7329fb';

const moviesFromQuery =
  'https://api.themoviedb.org/3/search/movie?api_key=7bacf57019a3c7657cb80da01b7329fb&language=en-US&page=1&include_adult=false';

const targetedMovie = `https://api.themoviedb.org/3/movie/`;

export const fetchPopularMovies = () => {
  return axios.get(`${popularMoviesURL}`).then(response => response.data);
};

export const fetchMovieFromId = id => {
  return axios
    .get(
      `${targetedMovie +
        id}?api_key=7bacf57019a3c7657cb80da01b7329fb&language=en-US`,
    )
    .then(response => response.data);
};

export const fetchMovieCast = id => {
  return axios
    .get(
      `${targetedMovie + id}/credits?api_key=7bacf57019a3c7657cb80da01b7329fb`,
    )
    .then(response => response.data);
};

export const fetchMovieReviews = id => {
  return axios
    .get(
      `${targetedMovie +
        id}/reviews?api_key=7bacf57019a3c7657cb80da01b7329fb&language=en-US&page=1`,
    )
    .then(response => response.data);
};

export const fetchMoviesFromQuery = query => {
  return axios
    .get(`${moviesFromQuery}&query=${query}`)
    .then(response => response.data);
};
