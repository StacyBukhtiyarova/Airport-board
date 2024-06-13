import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import './datePanel.scss';

const DatePanel = ({ onClickDate, pickedDate, onChangeDate }) => {
  const navigate = useNavigate();
  const oneDayMs = 86400000;
  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
  };
  const yesterday = new Date(
    new Date().getTime() - oneDayMs
  ).toLocaleDateString('ua-Ua', dateOptions);
  const today = new Date(new Date().getTime()).toLocaleDateString(
    'ua-Ua',
    dateOptions
  );
  const tomorrow = new Date(new Date().getTime() + oneDayMs).toLocaleDateString(
    'ua-Ua',
    dateOptions
  );

  const handleClickYesterday = () => {
    const yesterdayDate = new Date(new Date().getTime() - oneDayMs);
    onClickDate(yesterdayDate);
    updateURL(yesterdayDate);
  };

  const handleClickToday = () => {
    onClickDate(new Date());
    updateURL(new Date());
  };

  const handleClickTomorrow = () => {
    const tomorrowDate = new Date(new Date().getTime() + oneDayMs);
    onClickDate(tomorrowDate);
    updateURL(tomorrowDate);
  };

  const updateURL = (date) => {
    const searchParams = createSearchParams({
      selectedDate: date.toLocaleDateString(),
      type: 'departures',
    });
    navigate({
      pathname: location.pathname,
      search: decodeURIComponent(searchParams.toString()),
    });
  };

  return (
    <>
      <FontAwesomeIcon
        className="calendar-icon"
        icon={faCalendar}
      />
      <div className="date-panel">
        <input
          value={pickedDate.toISOString().split('T')[0]}
          type="date"
          onChange={(e) => onChangeDate(e)}
          className="date-panel__container input__type-date"></input>

        <div className="date-panel__container">
          <span>{yesterday}</span>
          <button
            onClick={handleClickYesterday}
            className="date-panel__button">
            <span>YESTERDAY</span>
          </button>
          <span
            className="date-panel__line"
            style={{
              borderBottomColor:
                pickedDate.toDateString() ===
                new Date(new Date().getTime() - oneDayMs).toDateString()
                  ? '#1eb7ee'
                  : '',
            }}></span>
        </div>
        <div className="date-panel__container">
          <span>{today}</span>
          <button
            onClick={handleClickToday}
            className="date-panel__button">
            <span>TODAY</span>
          </button>
          <span
            className="date-panel__line"
            style={{
              borderBottomColor:
                pickedDate.toDateString() === new Date().toDateString()
                  ? '#1eb7ee'
                  : '',
            }}></span>
        </div>
        <div className="date-panel__container">
          <span>{tomorrow}</span>
          <button
            onClick={handleClickTomorrow}
            className="date-panel__button">
            <span>TOMORROW</span>
          </button>
          <span
            className="date-panel__line"
            style={{
              borderBottomColor:
                pickedDate.toDateString() ===
                new Date(new Date().getTime() + oneDayMs).toDateString()
                  ? '#1eb7ee'
                  : '',
            }}></span>
        </div>
      </div>
    </>
  );
};

DatePanel.propTypes = {
  onClickDate: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func,
  pickedDate: PropTypes.object,
};

export default DatePanel;
