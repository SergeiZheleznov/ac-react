import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { AuthService, PostService } from './services';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const jwt = localStorage.getItem('jwt');
const link = createHttpLink({
  uri: 'http://localhost:1337/graphql',
  headers: {
    authorization: jwt ? `Bearer ${jwt}` : "",
  }
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const postService = new PostService(client);
const authService = new AuthService(client);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App
        postService={postService}
        authService={authService}
      />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
