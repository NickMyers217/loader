import React, { Component } from 'react';

const Nav = ({ title }) => (
    <nav className="navbar navbar-light bg-light" style={{marginBottom: 30}}>
        <div className="container">
            <span className="navbar-brand mb-0 h1">
                {title}
            </span>
        </div>
    </nav>
);

export default Nav;
