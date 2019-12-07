import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieCast.module.css';

const MovieCast = ({ movieCast }) => (
  <div className={styles.MovieCastWrapper}>
    {movieCast &&
      movieCast.cast.map(el => (
        <div key={el.id} className={styles.castWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w200${el.profile_path}`}
            alt={el.name}
          />
          <div>Name: {el.name}</div>
          <div>Character: {el.character}</div>
        </div>
      ))}
  </div>
);

MovieCast.propTypes = {
  movieCast: PropTypes.shape({ cast: PropTypes.arrayOf.isRequired }).isRequired,
};

export default MovieCast;
