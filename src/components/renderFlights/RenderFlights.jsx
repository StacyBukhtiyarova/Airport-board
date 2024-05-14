import React from 'react';
import PropTypes from 'prop-types';
import './renderFlights.scss';
const RenderFlights = ({
  filterArrivals,
  filterDepartures,
  clickArrivals,
  clickDepartures,
}) => {

  return (
    <ul className="flights-list__voyages">
      {clickArrivals === true && clickDepartures === false
        ? filterArrivals.map(
            ({
              terminal,
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
                <li
                  key={codeShare}
                  className="flights-list__display">
                  <span className="flights-list__terminal">{terminal}</span>
                  <span className="flights-list__time">{time}</span>
                  <span className="flights-list__departure">{arrivalCity}</span>
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
          )
        : filterDepartures.map(
            ({
              terminal,
              departureCity,
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
                <li
                  key={codeShare}
                  className="flights-list__display">
                  <span className="flights-list__terminal">{terminal}</span>
                  <span className="flights-list__time">{time}</span>
                  <span className="flights-list__departure">
                    {departureCity}
                  </span>
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
      {filterArrivals.length === 0 && filterDepartures.length === 0 ? (
        <span className='no-flights'>
          No flights
        </span>
      ) : (
        ''
      )}
    </ul>
  );
};

export default RenderFlights;
RenderFlights.propTypes = {
  filterArrivals: PropTypes.array,
  filterDepartures: PropTypes.array,
  setClickArrivals: PropTypes.func,
  setClickDepartures: PropTypes.func,
};
