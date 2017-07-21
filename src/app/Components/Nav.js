import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loggedIn } from '../helpers/actions';
import { store } from '../helpers/reducers';
import request from 'superagent';

const userUrl = '/api/user';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Boolean,
    };
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount(nextState, transition) {
    this.update();

    if (localStorage.getItem('token') === null) {
      store.dispatch({ type: 'UNAUTH' });
    } else {
      store.dispatch({ type: 'AUTH' });
    }

    // const self = this;
    // let x = 0;
    // let interval = setInterval(function () {
    //
    //   self.update();
    //
    //   if (++x === 10) {
    //     window.clearInterval(interval);
    //   }
    // }, 200);

    store.subscribe(() => {
      if (store.getState() === 1) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  update() {
    if (loggedIn()) {
      this.setState({
        loggedIn: true,
      });
    } else {
      this.setState({
        loggedIn: false,
      });
    }
  }

  logout() {
    // localStorage.removeItem('token');
    // window.location.replace('/logout');

    request
      .post('/logout')
    .type('form')
    .send({
      logout: true,
    }) // sends a JSON post body
    .set('Accept', 'application/json')
    .then(res => {
      if (res.statusCode === 200) {
        localStorage.removeItem('token');
        window.location.replace('/login');
      }
    });
  }

  render () {
    return (
      <div className="nav">
        {!this.state.loggedIn &&
          <div>
            <Link
              to="/"
              className="link"
              >Home</Link>
          <div className="link logout">
            <Link
              to="/login"
              className="link"
              >Login</Link>
            <Link
              to="/signup"
              className="link"
              >Signup</Link>
          </div>
          </div>
        }
        {this.state.loggedIn &&
          <div>
            <Link
              to="/"
              className="link"
              >Home</Link>
            <Link
              to="/dashboard"
              className="link"
              >Dashboard</Link>
            <div>
              <a
                href="#"
                onClick={this.logout}
                className="link logout"
                >Logout</a>
            </div>
          </div>
        }
      </div>
    );
  }
}
