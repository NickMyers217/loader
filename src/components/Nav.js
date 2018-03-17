import React from 'react';

export default function Nav({ title }) {
  return (
    <nav className="navbar navbar-light bg-light" style={{ marginBottom: 30 }}>
      <div className="container">
        <span className="navbar-brand mb-0 h1">{title}</span>
      </div>
    </nav>
  );
}
