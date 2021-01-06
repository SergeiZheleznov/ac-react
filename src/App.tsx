import React from 'react';
import './App.css';
import { LoginForm, PostPage, PostsList } from './containers';
import { AppContext } from './context/AppContext';
import { Route, Switch } from "wouter";
import { IUser } from './interfaces/IUser';
import { IAuthService, IPostService } from './interfaces';
import { CreatePost } from './routes/CreatePost';
import { AppBar, Button, Container, Theme, Toolbar, Typography } from '@material-ui/core';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

interface IAppProps {
  postService: IPostService;
  authService: IAuthService;
}

const App: React.FC<IAppProps> = (props) => {

  const { authService, postService } = props;
  const [currentUser, setCurrentUser] = React.useState<IUser | undefined>(undefined);
  const classes = useStyles();

  React.useEffect(()=>{
    (async()=>{
      const user = await authService.authenticate();
      setCurrentUser(user);
    })();
  },[authService]);

  return (
    <AppContext.Provider value={{ postService, authService, currentUser }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            { currentUser ? `Hi ${currentUser.username}` : <LoginForm />}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
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
      </Container>
    </AppContext.Provider>
  );
}

export default App;
