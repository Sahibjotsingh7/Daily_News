import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Contexts/AuthContext'; // Import AuthProvider

ReactDOM.render(
  <AuthProvider> {/* Wrap your App with AuthProvider */}
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
