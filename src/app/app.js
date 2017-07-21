import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Nav from './Components/Nav';
import Index from './Components/Index';
import Dashboard from './Components/Dashboard';
import Details from './Components/Details';
import Login from './Components/Login';
import Signup from './Components/Signup';
import NotFound from './Components/NotFound';

import style from './style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/p/d/:id" component={Details} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
