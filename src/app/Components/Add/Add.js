import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';
import { addPost, auth } from '../../helpers/actions';

export default class Add extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
  }

  componentWillMount() {
    auth(this);
  }

  add() {
    if (
      this.refs.title.value.length > 1 &&
      this.refs.desc.value.length > 1 &&
      this.refs.src.value.length > 1) {

      const title = this.refs.title.value;
      const desc = this.refs.desc.value;
      const src = this.refs.src.value;

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
  }

  render() {
    return (
      <div className="add">
        <h1>Add</h1>
        <form>
          <input type="text" ref="title" placeholder="Title" autoFocus/>
          <textarea ref="desc" placeholder="Description"></textarea>
          <textarea ref="src" placeholder="Image Source"></textarea>
          <button onClick={this.add} type="button">Add</button>
        </form>
      </div>
    );
  }
}
