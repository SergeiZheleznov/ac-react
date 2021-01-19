import React from 'react';
import { IAppContext } from "../interfaces";
import { RootStore } from '../stores';

export const AppContext = React.createContext<IAppContext>({
  rootStore: new RootStore()
});