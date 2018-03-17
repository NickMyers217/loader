import React from 'react';

import CircleButton from './CircleButton';

export default function Nav({ title, runPipeline }) {
  return (
    <nav className="navbar navbar-light bg-light" style={{ marginBottom: 30 }}>
      <div className="container">
        <span className="navbar-brand mb-0 h1">{title}</span>
        <span>
          <CircleButton type="play" onClick={e => runPipeline()} />
        </span>
      </div>
    </nav>
  );
}
