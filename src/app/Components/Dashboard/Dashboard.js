import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';
import { rootUrl } from '../../helpers/actions';
import { auth, loggedIn } from '../../helpers/actions';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: {},
      fetched: [],
      skip: 0,
      length: 5,
    };
    this.onChange = this.onChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.loadMoreButton = this.loadMoreButton.bind(this);
  }

  componentWillMount(nextState, transition) {
    auth(this);

    const _this = this;
    window.onscroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        _this.loadMore(0);
      }
    };
  }

  componentWillUnmount () {
    window.onscroll = null;
  }

  componentDidMount(nextState, transition) {
    if (loggedIn()) {
      request.get(rootUrl + '/posts/0')
        .then(res => {
          this.setState({
            data: res.body,
            fetched: res.body,
          });
        })
        .catch(err => {
          console.log(err);
        });

      request.get('/api/user')
        .then(res => {
          this.setState({
            user: res.body,
          });
        })
        .catch(err => {
          console.log(err);
        });

      request.get(rootUrl + '/count/posts')
        .then(res => {
          this.setState({
            length: res.text,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onChange(e) {
    const val = e.target.value.toLowerCase();
    if (this.state.data) {
      let data = this.state.data.data;
      if (data) {
        data.data = this.state.fetched.filter(post => {
          const includes = JSON.stringify(post).toLowerCase().includes(val);
          return includes;
        });
        this.setState({
          data: data,
        });
      }
    }
  }

  loadMoreButton() {
    this.loadMore(5);
  }

  loadMore(val) {
    this.setState({
      skip: this.state.skip + 5,
    });

    const skip = (this.state.skip + val).toString();
    request.get('https://react-eko.herokuapp.com/api/posts/' + skip)
      .then(res => {
        const data = this.state.data;
        res.body.forEach(post => {
          data.push(post);
        });
        this.setState({
          data: data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="dashboard">
      <div className="content">
        {this.state.user &&
          <div>
          <p>
            <Link
              style={{ display: 'none' }}
              to="/changepassword"
              >{this.state.user.user}</Link></p>
          <br/>
            <textarea onChange={this.onChange}></textarea>
          </div>
        }
        <div id="dashboard-content">
        { this.state.data &&
          this.state.data.map(post => {
            const p = <div className="post" key={post._id}>
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
                      </div>;
            return p;
          })
        }
        </div>
      </div>
      {
        this.state.skip + 5 < this.state.length &&
        <button id="load-more" onClick={this.loadMoreButton}>Load More</button>
      }
      </div>
    );
  }
}
