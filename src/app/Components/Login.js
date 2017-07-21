import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import request from 'superagent';
import { store } from '../helpers/reducers';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.username.length > 1 && this.state.password.length > 1) {

      const username = this.state.username;
      const password = this.state.password;

      document.getElementById('username').value = '';
      document.getElementById('password').value = '';

      request
        .post('/login')
        .type('form')
        .send({
          username: username,
          password: password,
        }) // sends a JSON post body
        .set('Accept', 'application/json')
        .then(res => {
          if (res.body === null) {
            this.setState({
              error: 'badRequest',
            });
          } else {
            localStorage.setItem('token', res.body.token);
            this.props.history.push('/dashboard');
            store.dispatch({ type: 'AUTH' });
          }
        });
    }
  }

  render () {
    return (
      <div className="login">
        <h2>Login</h2>
        {this.state.error &&
          <h3>{this.state.error}</h3>
        }
        <form>
          <div>
            <label>Username</label>
            <input type="text"
               id="username"
                placeholder="Username"
                autoFocus
                onChange={ e => {
                  this.setState({
                    username: e.target.value,
                  });
                }}

              />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={ e => {
                this.setState({
                  password: e.target.value,
                });
              }}

             />
          </div>
          <button type="button" onClick={this.login}>Submit</button>
        </form>
      </div>
    );
  }
}
