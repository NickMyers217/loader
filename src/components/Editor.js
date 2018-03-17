import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/mode/javascript';
import 'brace/theme/twilight';

export default function Editor({ height, mode, value, onChange }) {
  return (
    <AceEditor
      mode={mode}
      value={value}
      onChange={onChange}
      theme="twilight"
      name="textEditor"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      fontSize={16}
      tabSize={2}
      style={{ width: '100%', height: height || 225, fontFamily: 'monospace' }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2
      }}
    />
  );
}
