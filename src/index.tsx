import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { AuthService, PostService } from './services';

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
    <App
      postService={postService}
      authService={authService}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
