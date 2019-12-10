import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SearchForm.module.css';

const SearchForm = ({ onChange, queryMovies }) => (
  <div className="SearchFormWrapper" onSubmit={onChange}>
    <form className={styles.search__form}>
      <input type="text" autoComplete="off" placeholder="Search movies..." />
      <button type="submit">Search</button>
    </form>
    <div>
      <ul>
        {queryMovies &&
          queryMovies.map(el => (
            <li key={el.id}>
              <Link to={`movies/${el.id}`} id={el.id}>
                {el.original_title}
              </Link>
              <img src={el.poster_path} alt="" />
            </li>
          ))}
      </ul>
    </div>
  </div>
);

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  queryMovies: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default SearchForm;
