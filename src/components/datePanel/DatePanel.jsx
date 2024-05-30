import React from 'react';
import PropTypes from 'prop-types';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';

import './datePanel.scss';

const DatePanel = ({ onClickDate, onChangeDate, pickedDate }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
  const handleClickYesterday = (e) => {
    const yesterdayDate = new Date(new Date().getTime() - oneDayMs);

    onClickDate(yesterdayDate);
    const searchParams = createSearchParams({
      selectedDate: yesterdayDate.toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleClickToday = () => {
    onClickDate(new Date());
    const searchParams = createSearchParams({
      selectedDate: new Date().toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleClickTomorrow = () => {
    const tomorrowDate = new Date(new Date().getTime() + oneDayMs);
    onClickDate(tomorrowDate);
    const searchParams = createSearchParams({
      selectedDate: tomorrowDate.toLocaleDateString(),
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="date-panel">
      <input
        value={pickedDate.toISOString().split('T')[0]}
        type="date"
        onChange={(e) => onChangeDate(e)}
        className="date-panel__container input__type-date"
      />
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
  );
};

DatePanel.propTypes = {
  onClickDate: PropTypes.func.isRequired,
};

export default DatePanel;
