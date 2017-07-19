import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Signup extends Component {
  render () {
    return (
      <div className="login">
        <h2>Sign up</h2>
        <form method="post" action="/register">
          <div>
            <label>Username</label>
            <input type="text" placeholder="Username" name="username" autoFocus/>
          </div>
           <div>
            <label>Email</label>
            <input type="email" placeholder="Email" name="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Password" name="password" />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" placeholder="Password" name="password2" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
