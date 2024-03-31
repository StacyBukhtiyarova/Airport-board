import React from 'react';
import FlightsTitles from '../Components/FlightsTitles';

const RenderFlights = ({ filterFlights,filteredFlights }) => {

  return (
    <ul className="flights-list__voyages">
      {filterFlights.map(
        ({
          terminal,
          departureCity,
          arrivalCity,
          departureDate,
          status,
          airlineName,
          airlineLogo,
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
              <span className="flights-list__departure">{departureCity}</span>
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
  );
};

export default RenderFlights;
