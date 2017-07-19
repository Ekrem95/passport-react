import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {
  render () {
    return (
      <div className="nav">
        <h2 className="page-header" style={{ marginTop: 190 }}>Register</h2>
        <form method="post" action="/register">
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Username" name="username" />
          </div>
           <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" name="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password2" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}
