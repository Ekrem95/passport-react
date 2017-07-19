import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {
  render () {
    return (
      <div className="login">
        <h2>Login</h2>
        <form method="post" action="/login">
          <div>
            <label>Username</label>
            <input type="text" name="username" placeholder="Username" autoFocus/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
