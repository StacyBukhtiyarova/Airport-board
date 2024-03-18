import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { flightsSelector, searchFlightsSelector } from '../selector.js';
import fetchRequest from '.././serverRequests.js';
import Calendar, { onClickDay } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { printFlights } from '../actions.js';

const CalendarModal = ({ modalWindow, setModalWindow }) => {
  const [flights, setFlights] = useState([]);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState('');
  const onClickDay = (clickedDay, e) => {
    setPickedDate(clickedDay);
    e.preventDefault();
    fetchRequest().then((data) => {
      setFlights(data);
    });
  };

  const filterFlightsByDate = flights.filter(
    ({ arrivalDate }) =>
      new Date(arrivalDate).getDate() === new Date(pickedDate).getDate() &&
      new Date(arrivalDate).getMonth() === new Date(pickedDate).getMonth() &&
      new Date(arrivalDate).getFullYear() === new Date(pickedDate).getFullYear()
  );

  return (
    <div>
      <div className="calendar__modal">
        <Calendar
          onChange={onClickDay}
          onClickDay={onClickDay}
          value={pickedDate}
        />
      </div>
      <ul className="flights-list__voyages">
        {filterFlightsByDate.map(
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
    </div>
  );
};

export default CalendarModal;
