import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Posts extends Component {
  render() {
    return (
      <div>
      {this.props.posts.map(post => {
          const p = (
            <div className="post" key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <img src={post.src}/>
              <div className="buttons">
                  <button
                  type="button"
                  onClick={() => {
                    this.props.history.push('/p/d/' + post._id, { data: post });
                  }}
                  >Details</button>
                  <button
                  type="button"
                  onClick={() => {
                    this.props.history.push('/p/' + post._id, { data: post });
                  }}
                  >Edit</button>
              </div>
            </div>
          );
          return p;
        })
      }
      </div>
    );
  }
}

export const loadMoreButton = (func) => {
  const button = (
    <button
      id="load-more"
      onClick={func}>Load More
    </button>
  );
  return button;
};

export const changepassword = (username, onChange) => {
  const link = (
    <div>
      <br/>
      <textarea onChange={onChange}></textarea>
    </div>
  );
  return link;
};
