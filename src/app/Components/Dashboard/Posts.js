import React, { Component } from 'react';

export default class Posts extends Component {
  layout() {

    this.props.posts.forEach(post => {
      const eko = post._id;
      return eko;
    });
  }

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
