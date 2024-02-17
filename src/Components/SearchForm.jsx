import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import FlightButtons from '../Components/FlightButtons';
import flightsReducer from '.././reducer.js';

import {
  PRINT_DEPARTURES,
  printDepartures,
  printArrivals,
} from '../actions.js';
import { connect } from 'react-redux';

import fetchRequest from '../serverRequests.js';
const SearchForm = () => {
  console.log(this.props)
  const data = fetchRequest().then(data=>console.log(data));
  return (
    <>
      <div className="search-line-container">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          placeholder="Номер рейсу або місто"
          className="search-line-container"
        ></input>
        <button
          className="search-line-container search-button"
          type="submit"
          onClick={()=>data}
        >
          Знайти
        </button>
      </div>
      <FlightButtons />
     <ul>
       {
         
       }
     </ul>
    </>
  );
};
const mapState = (state) => ({
  departures: state.departures,
  arrivals: state.arrivals,
});
const mapDispatch =()=> ({
  
  printDepartures: printDepartures,
  printArrivals: printArrivals
});


export default connect(mapState, mapDispatch)(SearchForm);

export default SearchForm;