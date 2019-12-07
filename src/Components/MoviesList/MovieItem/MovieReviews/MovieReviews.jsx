import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieReviews.module.css';

const MovieReviews = ({ movieReviews }) => (
  <div className={styles.MovieReviewsWrapper}>
    {movieReviews && movieReviews.results.length > 0 ? (
      movieReviews.results.map(el => (
        <div key={el.id} className={styles.reviewsWrapper}>
          <div className={styles.authorName}>Author: {el.author}</div>
          <div>{el.content}</div>
        </div>
      ))
    ) : (
      <div>we do not have content for this movie</div>
    )}
  </div>
);

MovieReviews.propTypes = {
  movieReviews: PropTypes.shape({ results: PropTypes.arrayOf.isRequired })
    .isRequired,
};

export default MovieReviews;
