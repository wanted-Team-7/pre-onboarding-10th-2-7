import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import App from './App';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
${reset}
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>
);
