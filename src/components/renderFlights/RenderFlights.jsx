import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';

import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';

import './renderFlights.scss';
import { searchFlight } from '../../redux/selector';

const RenderFlights = ({
  filterDepartures,
  filterArrivals,
  filterArrivalsCodeShare,
  filterDeparturesCodeShare,

  searchFlight,
  searchButton,
}) => {
  const [searchParams] = useSearchParams();
  const flightTypeParam = searchParams.get('type');
  if (
    (searchFlight === '' && searchButton === true && filterArrivalsCodeShare.length === 0) ||
    filterDeparturesCodeShare.length === 0
  ) {
    return (
      <ul className="flights-list__voyages">
        {flightTypeParam === 'arrivals'
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
                const time = new Date(departureDate).toLocaleTimeString(
                  'it-IT',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                );
                return (
                  <li
                    key={codeShare}
                    className="flights-list__display">
                    <span className="flights-list__terminal">{terminal}</span>
                    <span className="flights-list__time">{time}</span>
                    <span className="flights-list__departure">
                      {arrivalCity}
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
                const time = new Date(departureDate).toLocaleTimeString(
                  'it-IT',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  }
                );
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
        {filterArrivals.length === 0 && filterDepartures.length === 0 && (
          <span className="no-flights">No flights</span>
        )}
      </ul>
    );
  }
  return (
    <ul className="flights-list__voyages">
      {flightTypeParam === 'arrivals' && searchButton === true
        ? filterDeparturesCodeShare.map(
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
        : filterDeparturesCodeShare.map(
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
      {filterArrivalsCodeShare.length === 0 &&
        filterDeparturesCodeShare.length === 0 && (
          <span className="no-flights">No flights</span>
        )}
    </ul>
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

export default connect(mapState, mapDispatch)(RenderFlights);

RenderFlights.propTypes = {
  filterArrivals: PropTypes.array,
  filterDepartures: PropTypes.array,
};
