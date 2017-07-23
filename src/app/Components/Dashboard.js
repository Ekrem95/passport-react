import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { rootUrl } from '../helpers/actions';
import { auth } from '../helpers/actions';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      user: {},
      fetched: {},
      skip: 0,
      length: 5,
    };
    this.onChange = this.onChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.loadMoreButton = this.loadMoreButton.bind(this);
  }

  componentWillMount(nextState, transition) {
    if (!auth()) {
      this.props.history.push('/login');
    }

    const self = this;
    window.onscroll = function () {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        self.loadMore(0);
      }
    };
  }

  componentWillUnmount () {
    window.onscroll = function () {
      return;
    };
  }

  componentDidMount(nextState, transition) {
    if (auth()) {
      axios.get(rootUrl + '/posts/0')
        .then(res => {
          this.setState({
            data: res,
            fetched: res.data,
          });
        })
        .catch(err => {
          console.log(err);
        });

      axios.get(rootUrl + '/usr')
        .then(res => {
          this.setState({
            user: res.data,
          });
        })
        .catch(err => {
          console.log(err);
        });

      axios.get(rootUrl + '/count/posts')
        .then(res => {
          this.setState({
            length: res.data,
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
          //return JSON.stringify(post).toLowerCase().indexOf(val) !== -1;
          return JSON.stringify(post).toLowerCase().includes(val);
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
    axios.get('https://react-eko.herokuapp.com/api/posts/' + skip)
      .then(res => {
        const data = this.state.data;
        res.data.forEach(post => {
          data.data.push(post);
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
              to="/changepassword"
              >{this.state.user.email}</Link></p>
          <br/>
            <textarea onChange={this.onChange}></textarea>
          </div>
        }
        <div id="dashboard-content">
        { this.state.data.data &&
          this.state.data.data.map(post => {
            return (
              <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <img src={post.src}/>
                <div className="buttons">
                  <Link to={'/p/d/' + post._id}>
                    <button>Details</button>
                  </Link>
                  <Link to={'/p/' + post._id}>
                    <button>Edit</button>
                  </Link>
                </div>
              </div>
            );
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
