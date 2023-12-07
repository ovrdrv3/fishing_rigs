// app/javascript/packs/hello_react.js

import React from 'react';
import ReactDOM from 'react-dom';
import RigComponent from '../components/RigComponent';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <RigComponent />,
    document.body.appendChild(document.createElement('div')),
  );
});
