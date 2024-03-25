import React, { useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarModal = ({ modalWindow, setModalWindow, onClickDate }) => {
  const [pickedDate, setPickedDate] = useState(new Date());

  const onClickDay = () => {
    setTimeout(() => {
      setModalWindow(!modalWindow);
    }, 1000);
  };

  return (
    <div>
      <div className="calendar__modal">
        <Calendar
          onClickDate={onClickDate}
          onChange={onClickDate}
          onClickDay={onClickDay}
          value={pickedDate}
          pickedDate={pickedDate}
          setPickedDate={setPickedDate}
          setModalWindow={setModalWindow}
        />
      </div>
    </div>
  );
};

export default CalendarModal;
