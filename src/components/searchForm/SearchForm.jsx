import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';
import fetchRequest from '../../gateways/serverRequests.js';
import CalendarModal from '../calendarModal/CalendarModal.jsx';
import RenderFlights from '../renderFlights/RenderFlights.jsx';
import FlightsTitles from '../flightTitles/FlightsTitles.jsx';
import SearchField from '../searchField/SearchField.jsx';

import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';
import FlightButtons from '../flightButtons/FlightButtons.jsx';

const SearchForm = ({ printFlights, searchFlights }) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const [clickArrivals, setClickArrivals] = useState(false);
  const [clickDepartures, setClickDepartures] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onClickFlights = (e) => {
    e.preventDefault();
    setModalWindow(false);
    return fetchRequest().then((data) => {
      setFlights(data), dispatch(printFlights(data));
    });
  };

  const onClickSearchFlight = (e) => {
    setInput(e.target.value);
    dispatch(searchFlights(e.target.value));
  };

  const onClickDate = (date) => {
    setPickedDate(date);
    dispatch(searchFlights(date));
    const searchParams = createSearchParams({
      pickedDate: date.toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  const filterDepartures = flights.filter(
    ({ departureCity, departureDate }) => {
      const filteredFlights =
        departureCity.toLowerCase().match(input.toLowerCase()) &&
        new Date(departureDate).getDate() === new Date(pickedDate).getDate() &&
        new Date(departureDate).getMonth() ===
          new Date(pickedDate).getMonth() &&
        new Date(departureDate).getFullYear() ===
          new Date(pickedDate).getFullYear();
      return filteredFlights;
    }
  );
  const filterArrivals = flights.filter(({ arrivalCity, arrivalDate }) => {
    const filteredFlights =
      arrivalCity.toLowerCase().match(input.toLowerCase()) &&
      new Date(arrivalDate).getDate() === new Date(pickedDate).getDate() &&
      new Date(arrivalDate).getMonth() === new Date(pickedDate).getMonth() &&
      new Date(arrivalDate).getFullYear() ===
        new Date(pickedDate).getFullYear();

    return filteredFlights;
  });
  useEffect(() => {
    const pickedDateFromURL = searchParams.get('pickedDate');
    if (
      pickedDateFromURL &&
      new Date(pickedDateFromURL).toISOString().split('T')[0] !==
        pickedDate.toISOString().split('T')[0]
    ) {
      setPickedDate(new Date(pickedDateFromURL));
      fetchRequest().then((data) => {
        const filteredFlights = data.filter(
          ({ departureDate, arrivalDate }) => {
            return (
              new Date(departureDate).toDateString() ===
                new Date(pickedDateFromURL).toDateString() ||
              new Date(arrivalDate).toDateString() ===
                new Date(pickedDateFromURL).toDateString()
            );
          }
        );
        setFlights(filteredFlights);
      });
    }
  }, [searchParams, pickedDate]);

  return (
    <div className="container">
      <SearchField
        modalWindow={modalWindow}
        setModalWindow={setModalWindow}
        onClickSearchFlight={onClickSearchFlight}
        onClickFlights={onClickFlights}
      />

      <FlightButtons
        filterArrivals={filterArrivals}
        filterDepartures={filterDepartures}
        setClickArrivals={setClickArrivals}
        setClickDepartures={setClickDepartures}
      />

      <FlightsTitles
        filterArrivals={filterArrivals}
        filterDepartures={filterDepartures}
      />

      {modalWindow && (
        <CalendarModal
          onClickDate={onClickDate}
          pickedDate={pickedDate}
          value={pickedDate}
        />
      )}

      <RenderFlights
        filterDepartures={filterDepartures}
        filterArrivals={filterArrivals}
        clickArrivals={clickArrivals}
        clickDepartures={clickDepartures}
      />
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

export default connect(mapState, mapDispatch)(SearchForm);

SearchForm.propTypes = {
  searchFlights: PropTypes.func,
  printArrivals: PropTypes.func,
  printDepartures: PropTypes.func,
  printFlights: PropTypes.func,
};
