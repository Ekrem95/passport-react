import React, { Component } from 'react';
import request from 'superagent';

export default class Tweets extends Component {
  constructor() {
    super();
    this.state = { tweets: null };
  }

  componentWillMount() {
    request.get('/api/tweets')
      .then(res => {
        if (res.statusCode === 200) {
          this.setState({ tweets: res.body.statuses });
        }
      });
  }

  render() {
    return (
      <div className="tweets">
      {this.state.tweets &&
        this.state.tweets.map(t => {
          const tweet = (
            <div
              onClick={() => {
                var win = window.open('https://twitter.com/' + t.user.screen_name, '_blank');
                win.focus();
              }}

              key={t.id}>
              <h5>{t.user.name}</h5>
              <p>{t.text}</p>
              <span>{t.created_at.slice(0, 10)}</span>
              <span>Favs: {t.favorite_count}</span>
              <span>RTs: {t.retweet_count}</span>
            </div>
          );
          return tweet;
        })
      }
      </div>
    );
  }
}
