import React from 'react';

import './CircleButton.css';
import FaCalendarPlusO from 'react-icons/lib/fa/plus-circle';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';
import FaPlay from 'react-icons/lib/fa/play';

export default function CircleButton({
  type = 'plus',
  color,
  onClick = () => {},
  size = 30
}) {
  if (type === 'plus') {
    return (
      <FaCalendarPlusO
        className="hoverable"
        color={color || 'green'}
        onClick={onClick}
        size={size}
      />
    );
  }
  if (type === 'info') {
    return (
      <FaInfoCircle
        className="hoverable"
        color={color || 'blue'}
        onClick={onClick}
        size={size}
      />
    );
  }
  if (type === 'play') {
    return (
      <FaPlay
        className="hoverable"
        color={color || 'green'}
        onClick={onClick}
        size={size}
      />
    );
  }
}
