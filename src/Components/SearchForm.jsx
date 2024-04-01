import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import CalendarModal from './CalendarModal.jsx';
import RenderFlights from './RenderFlights.jsx';
import FlightsTitles from './FlightsTitles.jsx';
import SearchField from './SearchField.jsx';
import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../actions.js';
import FlightButtons from '../Components/FlightButtons';

const SearchForm = ({
  printFlights,
  searchFlights,
  onClickDay,
  arrivals,
  filteredFlights,
  onClickArrivals,
}) => {
  const [flights, setFlights] = useState([]);
  const [input, setInput] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const [clickArrivals, setClickArrivals] = useState(false);
  const dispatch = useDispatch();
  const [pickedDate, setPickedDate] = useState(new Date());
  const filterDepartures = flights.filter(
    ({ departureCity, departureDate, arrivalDate }) => {
      const filteredFlights =
        departureCity.toLowerCase().match(input.toLowerCase()) &&
        new Date(departureDate).getDate() === new Date(pickedDate).getDate() &&
        new Date(departureDate).getMonth() ===
          new Date(pickedDate).getMonth() &&
        new Date(departureDate).getFullYear() ===
          new Date(pickedDate).getFullYear();
      // (new Date(arrivalDate).getDate() === new Date(pickedDate).getDate() &&
      //   new Date(arrivalDate).getMonth() ===
      //     new Date(pickedDate).getMonth() &&
      //   new Date(arrivalDate).getFullYear() ===
      //     new Date(pickedDate).getFullYear());

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
  // const filterFlights = flights.filter(
  //   ({ departureCity, departureDate, arrivalDate }) => {
  //     const filteredFlights =
  //       (departureCity.toLowerCase().match(input.toLowerCase()) &&
  //         new Date(departureDate).getDate() ===
  //           new Date(pickedDate).getDate() &&
  //         new Date(departureDate).getMonth() ===
  //           new Date(pickedDate).getMonth() &&
  //         new Date(departureDate).getFullYear() ===
  //           new Date(pickedDate).getFullYear()) ||
  //       (new Date(arrivalDate).getDate() === new Date(pickedDate).getDate() &&
  //         new Date(arrivalDate).getMonth() ===
  //           new Date(pickedDate).getMonth() &&
  //         new Date(arrivalDate).getFullYear() ===
  //           new Date(pickedDate).getFullYear());

  //     return filteredFlights;
  //   }
  // );
  const filterFlights = flights.map((data) => data);
  //  setFlights(filterFlights);
  // console.log(filterFlights);
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
  const onClickDate = (date) => {
    setPickedDate(date);
    dispatch(searchFlights(date));
    fetchRequest().then((data) => {
      setFlights(data);
      dispatch(printFlights(data));
    });
  };
  const onClickDepartures = (departureDate, data) => {
    e.preventDefault();
    setPickedDate(departureDate);
    //dispatch(searchFlights(departureDate));
    setFlights(data);
    fetchRequest().then((data) => {
      setFlights(data);
      dispatch(printFlights(data));
    });

    console.log(filterFlights);
  };

  return (
    <div className="container">
      <SearchField
        modalWindow={modalWindow}
        setModalWindow={setModalWindow}
        flights={flights}
        setFlights={setFlights}
        onClickFlights={onClickFlights}
        onClickSearchFlight={onClickSearchFlight}
        //pickedDate={pickedDate}
        setPickedDate={setPickedDate}
      />
      <FlightButtons
        // pickedDate={pickedDate}
        //  onClickDate={onClickDate}
        clickArrivals={clickArrivals}
        onClickArrivals={onClickArrivals}
        onClickDepartures={onClickDepartures}
        filterDepartures={filterDepartures}
        filterArrivals={filterArrivals}
        setClickArrivals={setClickArrivals}
      />
      <FlightsTitles />
      {modalWindow && (
        <CalendarModal
          onClickDate={onClickDate}
          setModalWindow={setModalWindow}
          modalWindow={modalWindow}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
          onClickDay={onClickDay}
        />
      )}
      <RenderFlights
        // pickedDate={pickedDate}
        filterFlights={filterFlights}
        filterDepartures={filterDepartures}
        filterArrivals={filterArrivals}
        clickArrivals={clickArrivals}
        setClickArrivals={setClickArrivals}
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
