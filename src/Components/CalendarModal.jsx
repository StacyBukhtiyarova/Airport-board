import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
const CalendarModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Calendar
      onChange={setStartDate}
      value={startDate}
    />
  );
};
export default CalendarModal;


const CalendarModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const onClickDay = (clickedDay) => {
    return setStartDate(clickedDay);
  };
  return (
    <Calendar onChange={onClickDay} onClickDay={onClickDay} value={startDate} />
  );
};

export default CalendarModal;