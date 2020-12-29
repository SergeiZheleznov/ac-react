import React from 'react';
import './App.css';
import { LoginForm, PostPage, PostsList } from './containers';
import { AppContext } from './context/AppContext';
import { Route, Switch } from "wouter";
import { IUser } from './interfaces/IUser';
import { IAuthService, IPostService } from './interfaces';
import { CreatePost } from './routes/CreatePost';

interface IAppProps {
  postService: IPostService;
  authService: IAuthService;
}

const App: React.FC<IAppProps> = (props) => {

  const { authService, postService } = props;
  const [currentUser, setCurrentUser] = React.useState<IUser | undefined>(undefined);

  React.useEffect(()=>{
    (async()=>{
      const user = await authService.authenticate();
      setCurrentUser(user);
    })();
  },[authService]);

  return (
    <AppContext.Provider value={{ postService, authService, currentUser }}>
      <div className="text-xs container mx-auto">
        <header className="App-header">
          { currentUser ? `Hi ${currentUser.username}` : <LoginForm />}
        </header>
        <Switch>
          <Route path="/post/:id">
            {params => <PostPage id={params.id} />}
          </Route>
          <Route path="/create" component={CreatePost} />
          <Route path="/edit/:id">
            {params => <PostPage id={params.id} />}
          </Route>
          <Route path="/" component={PostsList} />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
