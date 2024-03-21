import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import fetchRequest from '.././serverRequests.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { printFlights } from '../actions.js';

const CalendarModal = ({ modalWindow, setModalWindow }) => {
  const dispatch = useDispatch();
  const [flights, setFlights] = useState([]);
  const [pickedDate, setPickedDate] = useState(new Date());
  const [closeModal, setCloseModal] = useState(false);
  const onClickDate = () => {
    fetchRequest().then((data) => {
      setFlights(data);
      dispatch(printFlights(data));
    });
  };
  const onClickDay = (clickedDay) => {
    setPickedDate(clickedDay);

    fetchRequest().then((data) => {
      setFlights(data);
      dispatch(printFlights(data));
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
      <div
        className="calendar__modal"
        //   style={{ visibility: filterFlightsByDate.length > 0 ? 'hidden' : 'visible' }}
      >
        <Calendar
          onChange={onClickDay}
          onClickDay={onClickDay}
          value={pickedDate}
          setModalWindow={setModalWindow}
        />
      </div>

      <ul className="flights-list__voyages">
        {filterFlightsByDate.map(
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
