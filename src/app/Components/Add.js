import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';
import { addPost, auth } from '../helpers/actions';

export default class Add extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }

  componentWillMount() {
    auth(this);
  }

  add() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const src = document.getElementById('src').value;

    const post = { title, desc, src };

    request
      .post(addPost)
      .type('form')
      .send(post)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);

        this.props.history.push('/dashboard');
      });
  }

  render() {
    return (
      <div className="add">
        <h1>Add</h1>
        <form>
          <input type="text" id="title" placeholder="Title" autoFocus/>
          <textarea id="desc" placeholder="Description"></textarea>
          <textarea id="src" placeholder="Image Source"></textarea>
          <button onClick={this.add} type="button">Add</button>
        </form>
      </div>
    );
  }
}
