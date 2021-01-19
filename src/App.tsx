import React from 'react';
import './App.css';
import { LoginForm, PostPage, PostsList } from './containers';
import { AppContext } from './context/AppContext';
import { Route, Switch } from "wouter";
import { CreatePost } from './routes/CreatePost';
import { AppBar, Button, Container, Theme, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { RootStore } from './stores';

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

}

const App: React.FC<IAppProps> = (props) => {

  const rootStore = new RootStore();
  const classes = useStyles();

  React.useEffect(()=>{
    (async()=>{
      rootStore.authStore.authenticate();
    })();
  },[rootStore.authStore]);

  return (
    <AppContext.Provider value={{ rootStore }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <LoginForm />
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
