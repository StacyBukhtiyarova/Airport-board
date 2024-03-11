import React from 'react';

const RenderFlights = ({ filteredFlights }) => {
  return (
    <div>
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
                <span className="flights-list__arrival">{arrivalCity}</span>
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
    </div>
  );
};

export default RenderFlights;
