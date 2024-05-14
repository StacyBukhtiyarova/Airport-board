import React from 'react';
import PropTypes from 'prop-types';
import './datePanel.scss';

const DatePanel = ({
  onClickDate,
  setPickedDate,
  pickedDate,
  onChangeDate,
}) => {
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
  };

  const handleClickToday = () => {
    onClickDate(new Date());
  };

  const handleClickTomorrow = () => {
    const tomorrowDate = new Date(new Date().getTime() + oneDayMs);
    onClickDate(tomorrowDate);
  };
  const onChangeInputDate = (e) => {
    const date = new Date(e.target.value);
    setPickedDate(date);
    fetchFlightsForDate(date);
    const formattedDate = `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}`;
    const searchParams = createSearchParams({
      selectedDate: formattedDate,
    });
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div className="date-panel">
      <input
        type="date"
        value={onChangeInputDate}
        onChange={(e) => onChangeDate(e)}
        className="input__type-date"
        onChangeInputDate={onChangeInputDate}
      />
      <div className="date-panel__container">
        <span>{yesterday}</span>
        <button onClick={handleClickYesterday} className="date-panel__button">
          <span>YESTERDAY</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
      <div className="date-panel__container">
        <span>{today}</span>
        <button onClick={handleClickToday} className="date-panel__button">
          <span>TODAY</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
      <div className="date-panel__container">
        <span>{tomorrow}</span>
        <button onClick={handleClickTomorrow} className="date-panel__button">
          <span>TOMORROW</span>
        </button>
        <span className="date-panel__line"></span>
      </div>
    </div>
  );
};

DatePanel.propTypes = {
  onClickDate: PropTypes.func.isRequired,
};

export default DatePanel;
