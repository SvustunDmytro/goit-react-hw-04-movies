/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieItem.module.css';
import MovieCast from './MovieCast/MovieCast';
import MovieReviews from './MovieReviews/MovieReviews';
import * as movieAPI from '../../../service/api-service';

const getIdFromProps = props => props.match.params.movieId;
class MovieItem extends Component {
  state = { moviesById: {}, movieCast: null };

  componentDidMount() {
    const id = getIdFromProps(this.props);
    movieAPI.fetchMovieFromId(id).then(data =>
      this.setState({
        moviesById: data,
      }),
    );
    movieAPI.fetchMovieCast(id).then(data =>
      this.setState({
        movieCast: data,
      }),
    );
    movieAPI.fetchMovieReviews(id).then(data =>
      this.setState({
        movieReviews: data,
      }),
    );
  }

  handleGoBack = () => {
    const { state } = this.props.location;
    if (state) {
      this.props.history.push(state.from);
      return;
    }

    this.props.history.push({
      pathname: '/movies',
    });
  };

  render() {
    const { moviesById, movieCast, movieReviews } = this.state;
    const { match } = this.props;
    return (
      <>
        <div className={styles.MovieItemWrapper}>
          <div className={styles.buttonBlock}>
            <button type="button" onClick={this.handleGoBack}>
              go Back
            </button>
          </div>
          <div className={styles.imageWrap}>
            <img
              src={`https://image.tmdb.org/t/p/w200${moviesById.poster_path}`}
              alt=""
            />
          </div>
          <ul className={styles.overviewWrapper}>
            <li className={styles.title}>{moviesById.original_title}</li>
            <li className={styles.rank}>Rating: {moviesById.vote_average}</li>
            <li className={styles.titleOverview}>Overview</li>
            <li className={styles.rank}>{moviesById.overview}</li>
            <li className={styles.genres}>Genres</li>
            <li className={styles.rank}>
              {moviesById.genres &&
                moviesById.genres.map(el => <p key={el.id}>{el.name}</p>)}
            </li>
          </ul>
        </div>
        <div className={styles.commentsWrapper}>
          <ul className={styles.castList}>
            <li>
              <NavLink
                to={`${match.url}/casts`}
                activeClassName={styles.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${match.url}/reviews`}
                activeClassName={styles.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route
              path={`${match.url}/casts`}
              render={props => <MovieCast {...props} movieCast={movieCast} />}
            />
            <Route
              path={`${match.url}/reviews`}
              render={props => (
                <MovieReviews {...props} movieReviews={movieReviews} />
              )}
            />
          </Switch>
        </div>
      </>
    );
  }
}

MovieItem.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.shape({ from: PropTypes.shape.isRequired }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isExact: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieItem;
