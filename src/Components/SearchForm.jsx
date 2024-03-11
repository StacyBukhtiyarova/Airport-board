import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect, useDispatch, useSelector } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import CalendarModal from './CalendarModal.jsx';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../actions.js';
import FlightButtons from '../Components/FlightButtons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchForm = ({
  printFlights,
  searchFlights,

  startDate,
  setStartDate,
}) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const dispatch = useDispatch();
  const onClickFlights = (e) => {
    e.preventDefault();
    fetchRequest().then((data) => {
      return setFlights(data), dispatch(printFlights(data));
    });
  };
  const onClickSearchFlight = (e) => {
    setInput(e.target.value);
    dispatch(searchFlights(e.target.value));
  };
  const filteredFlights = flights.filter(({ departureCity, arrivalCity }) => {
    //  const departureFlight = input.toLowerCase() === departureCity.toLowerCase();
    //  const arrivalFlight = input.toLowerCase() === arrivalCity.toLowerCase();
    //   return departureFlight || arrivalFlight;
    const match = departureCity.toLowerCase().match(input.toLowerCase());
    return match;
  });
  // const displayedFlights = filteredFlights.map(
  //   ({ departureCity, arrivalCity }) =>
  //     console.log(input === departureCity)
  // );

>>>>>>> 09c9048e201e0d494276d0d885bdffc9db9be40f
  return (
    <div className="container">
      <FontAwesomeIcon
        icon={faCalendar}
        onClick={() => setModalWindow(!modalWindow)}
        className="calendar__icon"
      />
      <div className="search-line-container">
<<<<<<< HEAD
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
=======
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
        />
>>>>>>> 09c9048e201e0d494276d0d885bdffc9db9be40f
        <input
          type="text"
          placeholder="Номер рейсу або місто"
<<<<<<< HEAD
          className="text-field"
          value={input}
          onChange={onClickSearchFlight}
        ></input>
=======
          className="text-field"
          value={input}
          onChange={onClickSearchFlight}></input>
>>>>>>> 09c9048e201e0d494276d0d885bdffc9db9be40f
        <button
<<<<<<< HEAD
          className="search-line-container search-button"
          type="submit"
          onClick={onClickFlights}
        >
=======
          className="search-line-container search-button"
          type="submit"
          onClick={onClickFlights}>
>>>>>>> 09c9048e201e0d494276d0d885bdffc9db9be40f
          Знайти
        </button>
      </div>
<<<<<<< HEAD
      {modalWindow === true && (
        <button className="calendar__modal">
          <CalendarModal />
        </button>
      )}
      <FlightButtons />
      <section>
        <ul className="flights-list">
          <li className="flights-list__titles">Terminal</li>
          <li className="flights-list__titles">Schedule</li>
          <li className="flights-list__titles">Departure</li>
          <li className="flights-list__titles">Arrival</li>
          <li className="flights-list__titles">Status</li>
          <li className="flights-list__titles">Airline</li>
          <li className="flights-list__titles">Flight</li>
        </ul>
        <ul className="flights-list__voyages">
          {filteredFlights.map(
            ({
              terminal,
              departureCity,
              arrivalCity,
              type,
              departureDate,
              arrivalDate,
              departureDateExpected,
              arrivalDateExpected,
              status,
              airlineName,
              airlineLogo,
              id,
              codeShare,
            }) => {
              const time = new Date(departureDate).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <li className="flights-list__display">
                  <span className="flights-list__terminal">{terminal}</span>
                  <span className="flights-list__time">{time}</span>
                  <span className="flights-list__arrival">{arrivalCity}</span>
                  <span className="flights-list__departure">
                    {departureCity}
                  </span>
                  <span className="flights-list__status">{status}</span>
                  <span className="flights-list__airline">
                    {airlineName}
                    <img className="flights-list__logo-img" src={airlineLogo} />
                  </span>
                  <span className="flights-list__codeshare">{codeShare}</span>
                </li>
              );
            }
          )}
        </ul>
      </section>
    </div>
=======
      {modalWindow === true && (
        <button className="calendar__modal">
          <CalendarModal />
        </button>
      )}
      <FlightButtons />
      <section>
        {' '}
        <ul className="flights-list">
          <li className="flights-list__titles">Terminal</li>
          <li className="flights-list__titles">Schedule</li>
          <li className="flights-list__titles">Departure</li>
          <li className="flights-list__titles">Arrival</li>
          <li className="flights-list__titles">Status</li>
          <li className="flights-list__titles">Airline</li>
          <li className="flights-list__titles">Flight</li>
        </ul>
        <ul className="flights-list__voyages">
          {filteredFlights.map(
            ({
              terminal,
              departureCity,
              arrivalCity,
              type,
              departureDate,
              arrivalDate,
              departureDateExpected,
              arrivalDateExpected,
              status,
              airlineName,
              airlineLogo,
              id,
              codeShare,
            }) => {
              const time = new Date(departureDate).toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
              });
              return (
                <li className="flights-list__display">
                  <span className="flights-list__terminal">{terminal}</span>
                  <span className="flights-list__time">{time}</span>
                  <span className="flights-list__arrival">{arrivalCity}</span>
                  <span className="flights-list__departure">
                    {departureCity}
                  </span>
                  <span className="flights-list__status">{status}</span>
                  <span className="flights-list__airline">
                    {airlineName}
                    <img
                      className="flights-list__logo-img"
                      src={airlineLogo}
                    />
                  </span>
                  <span className="flights-list__codeshare">{codeShare}</span>
                </li>
              );
            }
          )}
        </ul>
      </section>
    </div>
>>>>>>> 09c9048e201e0d494276d0d885bdffc9db9be40f
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

export default connect(mapState, mapDispatch)(SearchForm);
