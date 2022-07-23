import React from 'react'

const TimeDisplay = ({ value, type }) => {
  return (
    <div>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default TimeDisplay;