import React from 'react';
import './App.css';
import { PostsList } from './containers/PostsList';
import { AppContext } from './context/AppContext';
import { PostService } from './services';

function App() {

  const postService = new PostService();
  return (
    <AppContext.Provider value={{ postService }}>
      <div className="text-xs">
        <header className="App-header">
          hi there!
        </header>
        <PostsList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
