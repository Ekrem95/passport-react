import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { store } from './helpers/reducers';

import Nav from './Components/Nav';
import Index from './Components/Index';
import Dashboard from './Components/Dashboard';
import Details from './Components/Details';
import Login from './Components/Login';
import Signup from './Components/Signup';
import NotFound from './Components/NotFound';
import Redux from './Components/Redux';

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
            <Route path="/redux" component={Redux} />
            <Route path="*" component={NotFound} />
          </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('app'));
