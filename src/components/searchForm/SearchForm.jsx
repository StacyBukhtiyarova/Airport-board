import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchFlightsSelector } from '../../redux/selector.js';

import fetchRequest from '../../gateways/serverRequests.js';
import RenderFlights from '../renderFlights/RenderFlights.jsx';
import FlightsTitles from '../flightTitles/FlightsTitles.jsx';
import SearchField from '../searchField/SearchField.jsx';
import DatePanel from '../datePanel/DatePanel.jsx';
import FlightButtons from '../flightButtons/FlightButtons.jsx';

const SearchForm = ({ searchFlight }) => {
  const [input, setInput] = useState('');
  const [flights, setFlights] = useState([]);
  const [pickedDate, setPickedDate] = useState(new Date());
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onClickDate = (date) => {
    setPickedDate(date);
    fetchFlightsForDate(date);
  };

  const fetchFlightsForDate = (date) => {
    fetchRequest().then((data) => {
      const filteredFlights = data.filter(({ departureDate, arrivalDate }) => {
        return (
          new Date(departureDate).toDateString() === date.toDateString() ||
          new Date(arrivalDate).toDateString() === date.toDateString()
        );
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
      type: 'departures',
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const pickedDateFromURL = searchParams.get('selectedDate');

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
      fetchFlightsForDate(new Date(formattedDate));
    }
  }, [searchParams]);

  const filterCodeShare = flights.filter(({ codeShare }) =>
    codeShare.includes(searchFlight.searchFlights.searchFlight)
  );

  return (
    <div className="container">
      <SearchField
        flights={flights}
        setFlights={setFlights}
        input={input}
        setInput={setInput}
      />
      <FlightButtons
        filterCodeShare={filterCodeShare}
        input={input}
        flights={flights}
        searchParams={searchParams}
        pickedDate={pickedDate}
      />
      <DatePanel
        onChangeDate={onChangeDate}
        onClickDate={onClickDate}
        pickedDate={pickedDate}
      />
      <FlightsTitles filterCodeShare={filterCodeShare} />

      <RenderFlights
        setInput={setInput}
        filterCodeShare={filterCodeShare}
        flights={flights}
        input={input}
      />
    </div>
  );
};

const mapState = (state) => {
  return { searchFlight: searchFlightsSelector(state) };
};

export default connect(mapState)(SearchForm);

SearchForm.propTypes = {
  searchFlight: PropTypes.object,
};
