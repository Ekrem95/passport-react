import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import request from 'superagent';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: [],
      msg: '',
    };
    this.signup = this.signup.bind(this);
  }

  signup() {

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    // document.getElementById('username').value = '';
    // document.getElementById('email').value = '';
    // document.getElementById('password').value = '';
    // document.getElementById('password2').value = '';

    request
      .post('/signup')
      .type('form')
      .send({
        username: username,
        email: email,
        password: password,
        password2: password2,
      }) // sends a JSON post body
      .set('Accept', 'application/json')
      .then(res => {
        if (res.body.errors) {
          this.setState({ errors: res.body.errors });
        } else {
          this.setState({ errors: [] });
          if (res.body.err) {
            if (res.body.err.code === 11000) {
              this.setState({ msg: 'This email is already taken.' });
            }
          } else {
            if (res.body.signup === true) {
              this.setState({
                errors: [],
                msg: 'You are signed up and now you can login',
              });
              let timeout = setTimeout(() => {
                this.props.history.push('/login');
              }, 5000);
            }
          }
        }
      });
  }

  render () {
    return (
      <div className="login">
        <h2>Sign up</h2>
        {this.state.errors &&
          this.state.errors.map((error, i) => {
            return (
              <h4
                key={i}
                style={{ color: '#d61566' }}
                >{error.msg}</h4>
            );
          })
        }
        {this.state.msg &&
              <h4
                style={{ color: '#d61566' }}
                >{this.state.msg}</h4>
        }
        <form method="post" action="/signup">
          <div>
            <label>Username</label>
            <input type="text" placeholder="Username" id="username" autoFocus/>
          </div>
           <div>
            <label>Email</label>
            <input type="email" placeholder="Email" id="email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Password" id="password" />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" placeholder="Password" id="password2" />
          </div>
          <button
            type="button"
            onClick={this.signup}
            >Signup</button>
        </form>
      </div>
    );
  }
}
