import React from 'react';
import { toHourMin } from './DurationFormatter';

const Duration = ({value}) => {
  return (
    <span className="duration">{value}m ({toHourMin(value)})</span>
  );
}

export default Duration;