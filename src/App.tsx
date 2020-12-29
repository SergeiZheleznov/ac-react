import React from 'react';
import './App.css';
import { LoginForm, PostPage, PostsList } from './containers';
import { AppContext } from './context/AppContext';
import { PostService, AuthService } from './services';
import { Route, Switch } from "wouter";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

function App() {

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

  React.useEffect(()=>{
    (async()=>{
      // const user = await authService.authenticate();
      // console.log(user);
    })();
  },[]);

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
