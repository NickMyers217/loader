import React, { Component } from 'react';

import './PlusSign.css';

import FaCalendarPlusO from'react-icons/lib/fa/plus-circle';

const PlusSign = ({ color='green', onClick=() => {}}) => (
    <FaCalendarPlusO
        className="hoverable"
        color={color}
        onClick={onClick}
    />
);

export default PlusSign;
