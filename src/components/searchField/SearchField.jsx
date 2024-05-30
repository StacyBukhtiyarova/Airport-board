import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import fetchRequest from '../../gateways/serverRequests';
import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';
import './searchField.scss';

const SearchField = ({
  searchFlights,
  flights,
  setFlights,
  searchFlight,
  setSearchButton,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const onClickSearchFlight = (e) => {
    dispatch(searchFlights(e.target.value));
    setInput(e.target.value);
    setSearchButton(true);
  };

  const onClickFlights = () => {
    setSearchButton(true);
    setInput(input);
    const filterCodeShare = flights.filter(({ codeShare }) => {
      return codeShare.includes(input);
    });
    setFlights(filterCodeShare);
    dispatch(printFlights(filterCodeShare));
  };

  return (
    <div>
      <div className="search-line-container">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
        />
        <input
          type="text"
          placeholder="Номер рейсу або місто"
          className="text-field"
          value={input}
          onChange={onClickSearchFlight}></input>
        <button
          className="search-line-container search-button"
          type="button"
          onClick={onClickFlights}>
          Знайти
        </button>
      </div>
    </div>
  );
};
const mapState = (state) => {
  return {
    flightsList: flightsSelector(state),
    searchFlight: searchFlightsSelector(state),
  };
};

const mapDispatch = {
  printDepartures,
  printArrivals,
  printFlights,
  searchFlights,
};

export default connect(mapState, mapDispatch)(SearchField);

SearchField.propTypes = {
  input: PropTypes.string,
  onClickFlights: PropTypes.func,
  onClickSearchFlight: PropTypes.func,
};
