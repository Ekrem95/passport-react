import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render () {
    return (
      <div className="notfound">
        <h1>404 NotFound</h1>
        <Link
          to="/"
          className="link"
          >You can go to Index</Link>
      </div>
    );
  }
}
