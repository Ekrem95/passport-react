import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { store } from './helpers/reducers';

import Nav from './Components/Nav/Nav';
import Index from './Components/Index/Index';
import Dashboard from './Components/Dashboard/Dashboard';
import Details from './Components/Details/Details';
import Edit from './Components/Edit/Edit';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import NotFound from './Components/NotFound/NotFound';
import Player from './Components/Player/Player';
import Add from './Components/Add/Add';

import style from './style.scss';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/p/d/:id" component={Details} />
            <Route path="/p/:id" component={Edit} />
            <Route path="/add" component={Add} />
            <Route path="/player" component={Player} />
            <Route path="*" component={NotFound} />
          </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
