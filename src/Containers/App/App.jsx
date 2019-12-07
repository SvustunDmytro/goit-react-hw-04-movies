/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import styles from './App.module.css';
import SearchForm from '../../Components/SearchForm/SearchForm';
import MoviesList from '../../Components/MoviesList/MoviesList';
import MovieItem from '../../Components/MoviesList/MovieItem/MovieItem';
import * as movieAPI from '../../service/api-service';

class App extends Component {
  state = {
    queryMovies: [],
    query: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      movieAPI.fetchMoviesFromQuery(query).then(data =>
        this.setState({
          queryMovies: data.results,
        }),
      );
    }
  }

  handleChange = e => {
    e.preventDefault();

    this.setState({
      query: e.target.firstChild.value,
    });
    e.target.reset();
  };

  render() {
    const { queryMovies } = this.state;
    return (
      <div className={styles.app}>
        <ul className={styles.list}>
          <li>
            <NavLink to="/" exact activeClassName={styles.activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" activeClassName={styles.activeLink}>
              Movies
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={MoviesList} />
          <Route path="/movies/:movieId" component={MovieItem} />
          <Route
            path="/movies"
            render={props => (
              <SearchForm
                {...props}
                onChange={this.handleChange}
                queryMovies={queryMovies}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
