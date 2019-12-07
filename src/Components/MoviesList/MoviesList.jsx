/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MoviesList.module.css';
import * as movieAPI from '../../service/api-service';

class MoviesList extends Component {
  state = { popularMovies: null };

  componentDidMount() {
    movieAPI.fetchPopularMovies().then(data =>
      this.setState({
        popularMovies: data.results,
      }),
    );
  }

  render() {
    const { popularMovies } = this.state;
    const { location } = this.props;
    return (
      <div className={styles.MoviesListWrapper}>
        <ul>
          {popularMovies &&
            popularMovies.map(el => (
              <li key={el.id}>
                <Link
                  to={{
                    pathname: `movies/${el.id}`,
                    state: { from: location },
                  }}
                  id={el.id}
                >
                  {el.original_title}
                </Link>
                <img src={el.poster_path} alt="" />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

MoviesList.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default MoviesList;
