import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loggedIn } from '../helpers/actions';

const userUrl = '/api/user';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Boolean,
    };
    this.logout = this.logout.bind(this);
    this.update = this.update.bind(this);
    this.inter = this.inter.bind(this);
  }

  componentWillMount(nextState, transition) {
    this.update();
    this.inter();
  }

  inter() {
    const interval = setInterval(this.update, 200);
    setTimeout(function () { clearInterval(interval); }, 5000);
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

    console.log('king');
  }

  logout() {
    // this.setState({
    //   loggedIn: false,
    // });
    localStorage.removeItem('token');
    window.location.replace('/logout');
  }

  render () {
    return (
      <div className="nav">
        {!this.state.loggedIn &&
          <div>
            <Link
              to="/login"
              className="link"
              >Login</Link>
            <Link
              to="/signup"
              className="link"
              >Signup</Link>
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
            <a
              href="#"
              onClick={this.logout}
              className="link logout"
              >Logout</a>
          </div>
        }

      </div>
    );
  }
}
