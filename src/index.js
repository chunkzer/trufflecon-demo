import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { Drizzle, generateStore } from "drizzle";
import { history, store } from './store';
import { DrizzleContext } from 'drizzle-react'
import drizzleOptions from './drizzleOptions'

// Layouts
import App from './App'

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);


ReactDOM.render((
    <DrizzleContext.Provider drizzle={drizzle}>
      <Router history={history} store={store}>
        <Route exact path="/" component={App} />
      </Router>
    </DrizzleContext.Provider>
  ),
  document.getElementById('root')
);
