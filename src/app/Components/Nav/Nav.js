import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { store } from '../../helpers/reducers';
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
            <NavLink
              to="/"
              activeStyle={{ color: 'rgb(186, 61, 230)' }}
              className="link"
              >Home</NavLink>
          <div className="link logout">
            <NavLink
              to="/login"
              activeStyle={{ color: 'rgb(186, 61, 230)' }}
              className="link"
              >Login</NavLink>
            <NavLink
              to="/signup"
              activeStyle={{ color: 'rgb(186, 61, 230)' }}
              className="link"
              >Signup</NavLink>
          </div>
          </div>
        }
        {this.state.loggedIn &&
          <div>
            <NavLink
              to="/"
              className="link"
              >Home</NavLink>
            <NavLink
              to="/dashboard"
              activeStyle={{ color: 'rgb(186, 61, 230)' }}
              className="link"
              >Dashboard</NavLink>
            <div
              className="dropdown"
            >Links
              <NavLink
                to="/player"
                activeStyle={{ color: 'rgb(186, 61, 230)' }}
                className="link"
                >Player</NavLink>
              <NavLink
                to="/add"
                activeStyle={{ color: 'rgb(186, 61, 230)' }}
                className="link"
                >Add</NavLink>
            </div>
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
