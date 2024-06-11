import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import './renderFlights.scss';

const RenderFlights = ({ filterCodeShare, flights, input }) => {
  const [searchParams] = useSearchParams();
  const flightTypeParam = searchParams.get('type');
  const [renderedFlights, setRenderedFlights] = useState([]);

  useEffect(() => {
    setRenderedFlights(flights);
    if (input !== '') {
      setRenderedFlights(filterCodeShare);
    }
  }, [flights]);

  return (
    <ul className="flights-list__voyages">
      {flightTypeParam === 'arrivals'
        ? renderedFlights.map(
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
                      alt="Airline Logo"
                    />
                  </span>
                  <span className="flights-list__codeshare">{codeShare}</span>
                </li>
              );
            }
          )
        : renderedFlights.map(
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
                      alt="Airline Logo"
                    />
                  </span>
                  <span className="flights-list__codeshare">{codeShare}</span>
                </li>
              );
            }
          )}
      {renderedFlights.length === 0 && (
        <span className="no-flights">No flights</span>
      )}
    </ul>
  );
};

export default RenderFlights;

RenderFlights.propTypes = {
  filterCodeShare: PropTypes.array,
  input: PropTypes.string,
  flights: PropTypes.array,
};
