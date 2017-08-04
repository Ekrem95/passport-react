import React, { Component } from 'react';
import request from 'superagent';
import{ rootUrl, editPost } from '../../helpers/actions';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.edit = this.edit.bind(this);
    this.id = this.props.location.pathname.split('/').pop();
  }

  componentWillMount() {
    if (this.props.location.state === undefined) {
      request.get(rootUrl + this.id)
        .then(res => {
          this.setState({ data: res.body });
        })
        .catch(err => console.log(err));
    } else {
      const data =  this.props.location.state.data;
      this.setState({ data });
    }
  }

  edit() {
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const src = document.getElementById('src').value;

    const post = { title, desc, src };

    request
      .post(editPost)
      .type('form')
      .send(post)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) console.log(err);

        this.props.history.push(`/p/d/${this.id}`);
      });
  }

  render() {
    const data = this.state.data;
    return (
      <div className="edit">
        <h1>Edit</h1>

        { data &&
          <div>
            <h3>{`Edit ${data.title}`}</h3>
            <form>
              <input defaultValue={data.title} type="text" id="title" placeholder="Title"/>
              <textarea defaultValue={data.desc} type="text" id="desc" placeholder="Description"></textarea>
              <textarea defaultValue={data.src} id="src" placeholder="Image Source"></textarea>
              <button onClick={this.edit} type="button">Edit</button>
            </form>
          </div>
        }
      </div>
    );
  }
}
