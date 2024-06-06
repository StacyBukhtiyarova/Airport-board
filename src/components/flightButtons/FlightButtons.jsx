import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { printFlights } from '../../redux/actions';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { flightsSelector } from '../../redux/selector';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import './flightButtons.scss';

const FlightButtons = ({ pickedDate, printFlights, filterCodeShare }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const flightTypeParams = searchParams.get('type');

  const onClickArrivals = () => {
    dispatch(printFlights(filterCodeShare));

    const searchParams = createSearchParams({
      selectedDate: pickedDate.toLocaleDateString(),
      type: 'arrivals',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
  };

  const onClickDepartures = () => {
    dispatch(printFlights(filterCodeShare));
    const searchParams = createSearchParams({
      selectedDate: pickedDate.toLocaleDateString(),
      type: 'departures',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
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
    flights: flightsSelector(state),
  };
};
const mapDispatch = {
  printFlights,
};
export default connect(mapState, mapDispatch)(FlightButtons);

FlightButtons.propTypes = {
  pickedDate: PropTypes.object,
  printFlights: PropTypes.func,
  filterCodeShare: PropTypes.array,
};
