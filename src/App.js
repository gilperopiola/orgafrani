import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import ProjectsView from './views/ProjectsView.js';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/projects" component={ProjectsView} />
            <Redirect to="/projects" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
