import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const userUrl = '/api/user';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Boolean,
    };
  }

  componentWillMount(nextState, transition) {
    axios.get(userUrl)
      .then(res => {
        if (res.data.user === null) {
          this.setState({
            loggedIn: false,
          });
        } else {
          this.setState({
            loggedIn: true,
          });
        }
      });
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
              >X</Link>
            <Link
              to="/dashboard"
              className="link"
              >Dashboard</Link>
            <a
              href="/logout"
              className="link logout"
              >Logout</a>
          </div>
        }

      </div>
    );
  }
}
