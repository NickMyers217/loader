import React from 'react';
import ReactJson from 'react-json-view';

export default function OutputData({ result = [] }) {
  return (
    <div>
      <div>
        <nav
          className="navbar navbar-light bg-light"
          style={{ marginBottom: 10 }}
        >
          <h5>Output Data</h5>
        </nav>
        <ReactJson
          src={result}
          name={false}
          collapsed={true}
          theme="apathy:inverted"
          onEdit={false}
          onDelete={false}
          onAdd={false}
        />
      </div>
    </div>
  );
}
