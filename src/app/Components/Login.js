import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import request from 'superagent';
import { store } from '../helpers/reducers';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.email.length > 1 && this.state.password.length > 1) {

      const email = this.state.email;
      const password = this.state.password;

      request
        .post('/login')
        .type('form')
        .send({
          email: email,
          password: password,
        }) // sends a JSON post body
        .set('Accept', 'application/json')
        .then(res => {
          if (res.body === null) {
            this.setState({
              error: `Invalid email & password combination.
                      Please try again.`,
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
            <label>Email</label>
            <input type="text"
               id="email"
                placeholder="Email"
                autoFocus
                onChange={ e => {
                  this.setState({
                    email: e.target.value,
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
          <button type="button" onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
}
