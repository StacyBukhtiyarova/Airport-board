// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect, useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// import {
//   flightsSelector,
//   searchFlightsSelector,
// } from '../../redux/selector.js';
// import { searchFlights, printFlights } from '../../redux/actions.js';
// import './searchField.scss';

// const SearchField = ({ flights, setFlights, input, setInput }) => {
//   const dispatch = useDispatch();

//   const onClickSearchFlight = (e) => {
//     dispatch(searchFlights(e.target.value));
//     setInput(e.target.value);
//   };

//   const onClickFlights = () => {
//     const filterCodeShare = flights.filter(({ codeShare }) => {
//       return codeShare.includes(input);
//     });

//       setFlights(filterCodeShare);
//       dispatch(printFlights(filterCodeShare));
//       dispatch(searchFlights(input));

//   };
//   return (
//     <div>
//       <div className="search-line-container">
//         <FontAwesomeIcon
//           icon={faMagnifyingGlass}
//           className="search-icon"
//         />
//         <input
//           type="text"
//           placeholder="Номер рейсу або місто"
//           className="text-field"
//           value={input}
//           onChange={onClickSearchFlight}></input>
//         <button
//           className="search-line-container search-button"
//           type="button"
//           onClick={onClickFlights}>
//           Знайти
//         </button>
//       </div>
//     </div>
//   );
// };
// const mapState = (state) => {
//   return { searchFlight: searchFlightsSelector(state) };
// };

// export default connect(mapState)(SearchField);

// SearchField.propTypes = {
//   input: PropTypes.string,
//   flights: PropTypes.array,
//   setFlights: PropTypes.func,
// };

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';
import { searchFlights, printFlights } from '../../redux/actions.js';
import './searchField.scss';

const SearchField = ({ flights, setFlights, input, setInput }) => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  const onClickSearchFlight = (e) => {
    setInput(e.target.value);
  };

  const onClickFlights = () => {
    const filterCodeShare = flights.filter(({ codeShare }) => {
      return codeShare.includes(input);
    });
    setFlights(filterCodeShare);
    dispatch(printFlights(filterCodeShare));
    dispatch(searchFlights(input));
    
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
  return { searchFlight: searchFlightsSelector(state) };
};

export default connect(mapState)(SearchField);

SearchField.propTypes = {
  input: PropTypes.string,
  flights: PropTypes.array,
  setFlights: PropTypes.func,
};
