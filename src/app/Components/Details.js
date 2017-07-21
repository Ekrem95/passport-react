import React, { Component } from 'react';
import axios from 'axios';
import request from 'superagent';
import{ rootUrl, postDetails } from '../helpers/actions';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
    this.sendComment = this.sendComment.bind(this);
  }

  componentWillMount () {
    axios.get(rootUrl + this.props.location.pathname.split('/').pop())
      .then(res => {
        this.setState({
          data: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendComment (e) {
    e.preventDefault();

    const comment = document.getElementById('textarea').value;
    document.getElementById('textarea').value = '';

    const data = this.state.data;
    data.comments.push(comment);

    this.setState({
      data: data,
    });

    request
      .post(postDetails)
      .type('form')
      .send({ box: comment }) // sends a JSON post body
      .set('Accept', 'application/json')
      .end(function (err, res) {
      // Calling the end function will send the request
    });
  }

  render () {
    const data = this.state.data;
    return (
      <div className="details">
        <h1>{data.title}</h1>
        <img
          src={data.src}/>
        <p>{data.desc}</p>
          <form>
          <textarea
            id="textarea"
            name="box"
            placeholder="Type here to post a comment"
            ></textarea>
            <button
              onClick={this.sendComment}
              className="cBtn">Send</button>
            </form>
            { data.comments &&
              data.comments.map((comment, i) => {
                return (
                  <p key={i}>{comment}</p>
                );
              })
            }
      </div>
    );
  }
}
