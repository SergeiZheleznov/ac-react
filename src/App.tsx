import React from 'react';
import './App.css';
import { LoginForm, PostPage, PostsList } from './containers';
import { AppContext } from './context/AppContext';
import { PostService, AuthService } from './services';
import { Route, Switch } from "wouter";
import { ApolloClient, InMemoryCache } from '@apollo/client';

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
  });

  const postService = new PostService(client);
  const authService = new AuthService(client);
  return (
    <AppContext.Provider value={{ postService, authService }}>
      <div className="text-xs container mx-auto">
        <header className="App-header">
          hi there!
          <LoginForm />
        </header>
        <Switch>
          <Route path="/post/:id">
            {params => <PostPage id={params.id} />}
          </Route>
          <Route path="/" component={PostsList} />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
