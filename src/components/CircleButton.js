import React from 'react';

import './CircleButton.css';
import FaCalendarPlusO from 'react-icons/lib/fa/plus-circle';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';
import FaPlayCircle from 'react-icons/lib/fa/play-circle';

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
      <FaPlayCircle
        className="hoverable"
        color={color || 'green'}
        onClick={onClick}
        size={size}
      />
    );
  }
}
