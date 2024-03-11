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
>>>>>>> 09c9048e201e0d494276d0d885bdffc9db9be40f

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