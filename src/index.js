import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/main.css'

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles';

import {
  purple,
  green,
  red,
  teal
} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[900],
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
