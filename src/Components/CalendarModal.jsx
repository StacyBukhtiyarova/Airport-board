import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar, { onClickDay } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarModal = ({ pickedDate, setPickedDate }) => {
  const onClickDay = (clickedDay) => {
    return setPickedDate(clickedDay);
  };
  return (
    <Calendar
      onChange={onClickDay}
      onClickDay={onClickDay}
      value={pickedDate}
    />
  );
};

export default CalendarModal;
