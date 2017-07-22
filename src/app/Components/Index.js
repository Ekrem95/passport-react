import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { loggedIn } from '../helpers/actions';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentWillMount() {
    // if (localStorage.getItem('token') === null) {
    //   window.location.replace('/login');
    //   return;
    // }

    axios.get('https://react-eko.herokuapp.com/api/posts')
      .then(res => {
        this.setState({
          data: res.data,
        });
        //console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render () {
    //console.log(this.state.data);
    return (
      <div className="indexContainer">
        <div
          className="index"
          >
          { this.state.data.length > 0 &&
            this.state.data.map(post => {
              return (
                <div key={post._id}>
                  <h3>{post.title}</h3>
                  <img
                    key={post._id}
                    src={post.src}
                  />
                  <p>{post.desc}</p>
                  <span
                    onClick={() => {
                      this.props.history.push(`/p/d/${post._id}`);
                    }}
                    >{post.comments.length} comments</span>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
