import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';

const FlightButtons = () => {
  return (
    <div className="flights">
      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneArrival}
          className="plane-icon__arrival"
        />
        <button type="submit" className=" flights__arrival-button">
          Приліт
        </button>
      </div>
      <div className="flights__button">
        <FontAwesomeIcon
          icon={faPlaneDeparture}
          className="plane-icon__departure"
        />
        <button type="submit" className=" flights__departure-button">
          Виліт
        </button>
      </div>
    </div>
  );
};
export default FlightButtons;