import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';
import { loggedIn } from '../../helpers/actions';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    if (!loggedIn()) {
      this.props.history.push('/login');
    } else {
      request.get('https://react-eko.herokuapp.com/api/posts')
        .then(res => {
          this.setState({
            data: res.body,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render () {
    return (
      <div
        className="index"
        >
        { this.state.data.length > 0 &&
          this.state.data.map(post => {
            const p = <div key={post._id}>
                        <h3>{post.title}</h3>
                        <img
                          key={post._id}
                          src={post.src}
                        />
                        <p>{post.desc}</p>
                        <span
                          onClick={() => {
                            this.props.history.push(`/p/d/${post._id}`, { data: post });
                          }}
                          >{post.comments.length} comment(s)</span>
                      </div>;
            return p;
          })
        }
      </div>
    );
  }
}
