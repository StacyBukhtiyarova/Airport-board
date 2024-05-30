import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { printFlights, searchFlights } from '../../redux/actions';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { flightsSelector, searchFlightsSelector } from '../../redux/selector';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import fetchRequest from '../../gateways/serverRequests';
import './flightButtons.scss';

const FlightButtons = ({
  setClickFlightTypeButton,
  setClickDepartures,
  filterArrivals,
  filterDepartures,
  filterArrivalsCodeShare,
  filterDeparturesCodeShare,
  pickedDate,
  printFlights,
  setFilterByInput,
  filterCodeShare,
  clickFlightTypeButton,
  searchFlight,
  flights,
  setFlights,
 
  searchFlights,
}) => {
  const [input, setInput] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const flightTypeParams = searchParams.get('type');

  const onClickArrivals = () => {
    setInput(input);
   
    const searchParams = createSearchParams({
      selectedDate: pickedDate.toLocaleDateString(),
      type: 'arrivals',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
    const filterFlights = filterArrivals.filter(({ codeShare }) =>
      codeShare.includes(searchFlight.searchFlights.searchFlight)
    );
    setFilteredFlights(filterFlights);
    dispatch(printFlights(filterFlights));
   

    return filteredFlights;
  };

  const onClickDepartures = () => {
    setInput(input);
   
    const filterFlights = filterDepartures.filter(({ codeShare }) => {
      return codeShare.includes(searchFlight.searchFlights.searchFlight);
    });
    const searchParams = createSearchParams({
      selectedDate: pickedDate.toLocaleDateString(),
      type: 'departures',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
    setFilteredFlights(filterFlights);
    dispatch(printFlights(filterFlights));
    console.log(filterFlights);

    return filteredFlights;
  };

  return (
    <div className="flights">
      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          className="plane-icon__departure"
        />
        <button
          type="button"
          className="flights__departure-button"
          onClick={onClickDepartures}
          style={{
            backgroundColor: flightTypeParams === 'departures' ? '#1eb7ee' : '',
            color: flightTypeParams === 'departures' ? '#fff' : '',
            border: flightTypeParams === 'departures' ? '5px solid #fff' : '',
          }}>
          Виліт
        </button>
      </div>

      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneArrival}
          className="plane-icon__arrival"
        />
        <button
          type="button"
          className="flights__arrival-button"
          onClick={onClickArrivals}
          style={{
            backgroundColor: flightTypeParams === 'arrivals' ? '#1eb7ee' : '',
            color: flightTypeParams === 'arrivals' ? '#fff' : '',
            border: flightTypeParams === 'arrivals' ? '5px solid #fff' : '',
          }}>
          Приліт
        </button>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    arrivals: searchFlightsSelector(state),
    departures: searchFlightsSelector(state),
    flights: flightsSelector(state),
    searchFlight: searchFlightsSelector(state),
  };
};
const mapDispatch = {
  printFlights,
  searchFlights,
};
export default connect(mapState, mapDispatch)(FlightButtons);

FlightButtons.propTypes = {
  filterArrivals: PropTypes.array,
  filterDepartures: PropTypes.array,
  setFlightTypeButton: PropTypes.func,
  setClickDepartures: PropTypes.func,
  pickedDate: PropTypes.object,
  printFlights: PropTypes.func,
  flights: PropTypes.array,
  input: PropTypes.string,
};
