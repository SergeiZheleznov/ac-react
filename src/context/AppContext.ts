import React from 'react';
import { IAppContext } from "../interfaces";

export const AppContext = React.createContext<IAppContext>({
  postService: undefined,
  authService: undefined
});