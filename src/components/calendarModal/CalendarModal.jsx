import React from 'react';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';
import  {
  createBrowserRouter,
  RouterProvider,
 BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './calendar.css';
import './calendarModal.scss';

const CalendarModal = ({ onClickDate, pickedDate }) => {
  console.log(new Date(pickedDate));
  return (
    <div>
      <div className="calendar__modal">
       
            <Calendar
              onClickDate={onClickDate}
              onChange={onClickDate}
              pickedDate={pickedDate}
            />
      
      </div>
    </div>
  );
};

export default CalendarModal;

CalendarModal.propTypes = {
  onClickDate: PropTypes.func,
};
