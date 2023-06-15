import React from 'react';

const FormatTime12Hour = ({ timeString }) => {
  const [hours, minutes, seconds] = timeString.split(':');
  let period = 'AM';
  let formattedHours = parseInt(hours);

  if (formattedHours >= 12) {
    period = 'PM';
    if (formattedHours > 12) {
      formattedHours -= 12;
    }
  }

  return <>{`${period} ${formattedHours}:${minutes}`}</>;
};

export default FormatTime12Hour;
