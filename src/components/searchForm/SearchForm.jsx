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
import RenderFlights from '../renderFlights/RenderFlights.jsx';
import FlightsTitles from '../flightTitles/FlightsTitles.jsx';
import SearchField from '../searchField/SearchField.jsx';
import DatePanel from '../datePanel/DatePanel.jsx';
import FlightButtons from '../flightButtons/FlightButtons.jsx';

import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';

const SearchForm = ({
  flightsList,
  searchFlight,
  onClickFlights,
  onClickSearchFlight,
}) => {
  const [flights, setFlights] = useState([]);
  const [searchButton, setSearchButton] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [clickArrivals, setClickArrivals] = useState(false);
  const [clickDepartures, setClickDepartures] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const [formSearchParams, setFormSearchParams] = useState({
    searchTerm: '',
  });

  const onClickDate = (date) => {
    setPickedDate(date);
    fetchFlightsForDate(date, searchFlight.searchFlights.searchFlight);
  };

  const fetchFlightsForDate = (date, searchCode) => {
    console.log(searchCode);
    fetchRequest().then((data) => {
      const filteredFlights = data
        .filter(({ departureDate, codeShare }) => {
          if (searchCode !== undefined) {
            return (
              new Date(departureDate).toDateString() === date.toDateString() &&
              codeShare.includes(searchCode)
            );
          } else {
            return (
              new Date(departureDate).toDateString() === date.toDateString()
            );
          }
        });

      setFlights(filteredFlights);
    });
  };

  const onChangeDate = (e) => {
    const date = new Date(e.target.value);
    setPickedDate(date);
    fetchFlightsForDate(date, searchFlight.searchFlights.searchFlight);
    const searchParams = createSearchParams({
      selectedDate: date.toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const pickedDateFromURL = searchParams.get('selectedDate');
  const flightType = searchParams.get('type');

  useEffect(() => {
    if (!pickedDateFromURL) {
      const searchParams = createSearchParams({
        selectedDate: new Date().toLocaleDateString(),
        type: 'departures',
      });
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
    }
    if (pickedDateFromURL) {
      const [day, month, year] = pickedDateFromURL.split('.');
      const formattedDate = `${year}-${month}-${day}`;
      setPickedDate(new Date(formattedDate));
      fetchFlightsForDate(new Date(formattedDate), searchFlight.searchFlights.searchFlight);
    }
    if (flightType === 'arrivals') {
      setClickArrivals(true);
      setClickDepartures(false);
    } else {
      setClickArrivals(false);
      setClickDepartures(true);
    }
  }, [searchParams, formSearchParams]);

  return (
    <div className="container">
      <SearchField
        setFormSearchParams={setFormSearchParams}
        setSearchButton={setSearchButton}
        onClickSearchFlight={onClickSearchFlight}
        onClickFlights={onClickFlights}
        flights={flights}
        setFlights={setFlights}
      />
      <FlightButtons
        flights={flights}
        setFormSearchParams={setFormSearchParams}
        setClickDepartures={setClickDepartures}
        setClickArrivals={setClickArrivals}
        searchParams={searchParams}
        pickedDate={pickedDate}
      />
      <DatePanel
        onChangeDate={onChangeDate}
        onClickDate={onClickDate}
        pickedDate={pickedDate}
      />
      <FlightsTitles flights={flights} />

      <RenderFlights
        searchButton={searchButton}
        flights={flights}
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
