import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: Boolean,
    };
  }

  // componentWillMount(nextState, transition) {
  //   axios.get('api/isloggedin')
  //     .then(res => {
  //       if (res.data == 'no') {
  //         this.setState({
  //           loggedIn: false,
  //         });
  //       } else {
  //         this.setState({
  //           loggedIn: true,
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render () {
    return (
      <div className="nav">
        <div>
        <Link
          to="/"
          className="link"
          >X</Link>
        <Link
          to="/login"
          className="link"
          >Login</Link>
        <Link
          to="/register"
          className="link"
          >Register</Link>
        <Link
          to="/dashboard"
          className="link"
          >Dashboard</Link>
        <a
          href="/logout"
          className="link"
          >Logout</a>
          </div>
      </div>
    );
  }
}
