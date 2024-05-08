import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  flightsSelector,
  searchFlightsSelector,
} from '../../redux/selector.js';
import fetchRequest from '../../gateways/serverRequests.js';
import CalendarModal from '../calendarModal/CalendarModal.jsx';
import RenderFlights from '../renderFlights/RenderFlights.jsx';
import FlightsTitles from '../flightTitles/FlightsTitles.jsx';
import SearchField from '../searchField/SearchField.jsx';
import './datePanel.scss';

import {
  searchFlights,
  printArrivals,
  printDepartures,
  printFlights,
} from '../../redux/actions.js';
import FlightButtons from '../flightButtons/FlightButtons.jsx';

const DatePanel = ({ onClickFlights, onClickDate }) => {
  const oneDayMs = 86400000;
  // const yesterday = new Date(
  //   new Date().getTime() - oneDayMs
  // ).toLocaleDateString('ua-Ua', {
  //   day: '2-digit',
  //   month: '2-digit',
  // });
  const yesterday = new Date(new Date('2023-04-04')).toLocaleDateString();
  const today = new Date(new Date().getTime()).toLocaleDateString('ua-Ua', {
    day: '2-digit',
    month: '2-digit',
  });
  const tomorrow = new Date(new Date().getTime() + oneDayMs).toLocaleDateString(
    'ua-Ua',
    {
      day: '2-digit',
      month: '2-digit',
    }
  );
  return (
    <div className="date-panel">
      <div className="date-panel__container">
        <span>{yesterday}</span>
        <button
          onClick={onClickFlights}
          className="date-panel__button">
          <span>YESTERDAY</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
      <div className="date-panel__container">
        <span>{today}</span>
        <button className="date-panel__button">
          <span>TODAY</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
      <div className="date-panel__container">
        <span>{tomorrow}</span>
        <button className="date-panel__button">
          <span>TOMORROW</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
    </div>
  );
};
export default DatePanel;
