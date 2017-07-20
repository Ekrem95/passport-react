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
  }

  componentWillMount(nextState, transition) {
    this.update();
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
