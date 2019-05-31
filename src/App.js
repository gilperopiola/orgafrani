import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import DashboardView from './views/DashboardView.js';
import ProjectsView from './views/ProjectsView.js';
import SkillsView from './views/SkillsView.js';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/dashboard" component={DashboardView} />
            <Route exact path="/projects" component={ProjectsView} />
            <Route exact path="/skills" component={SkillsView} />
            <Redirect to="/dashboard" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
