import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
  }

  componentWillMount(nextState, transition) {
    if (localStorage.getItem('token') === null) {
      this.setState({
        loggedIn: false,
      });
    } else {
      this.setState({
        loggedIn: true,
      });
    }

    store.subscribe(() => {
      if (store.getState() === 1) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  logout() {
    request
      .post('/logout')
      .type('form')
      .send({
        logout: true,
      })
      .set('Accept', 'application/json')
      .then(res => {
        if (res.statusCode === 200) {
          localStorage.removeItem('token');
          store.dispatch({ type: 'UNAUTH' });
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
            <Link
              to="/player"
              className="link"
              >Player</Link>
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
