import React from 'react';
import PropTypes from 'prop-types';
import './flightsTitles.scss';

const FlightsTitles = ({ filterArrivals, filterDepartures }) => {
  return filterArrivals.length > 0 && filterDepartures.length > 0 ? (
    <ul className="flights-list">
      <li className="flights-list__titles">Термінал</li>
      <li className="flights-list__titles">Розклад</li>
      <li className="flights-list__titles">Призначення</li>
      <li className="flights-list__titles">Статус</li>
      <li className="flights-list__titles">Авіакомпанія</li>
      <li className="flights-list__titles">Рейс</li>
    </ul>
  ) : (
    ''
  );
};

export default FlightsTitles;
FlightsTitles.propTypes = {
  filterArrivals: PropTypes.array,
  filterDepartures: PropTypes.array,
};
