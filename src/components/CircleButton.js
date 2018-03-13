import React from 'react';

import './CircleButton.css';

import FaCalendarPlusO from'react-icons/lib/fa/plus-circle';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';


const CircleButton = ({ type='plus', color, onClick=() => {} }) => {
    if (type === 'plus') {
        return (
            <FaCalendarPlusO
                className="hoverable"
                color={color || 'green'}
                onClick={onClick}
            />
        );
    }
    if (type === 'info') {
        return (
            <FaInfoCircle
                className="hoverable"
                color={color || 'blue'}
                onClick={onClick}
            />
        );
    }
};

export default CircleButton;
