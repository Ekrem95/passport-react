import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Nav from './Components/Nav';
import Index from './Components/Index';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
