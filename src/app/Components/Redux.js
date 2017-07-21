import React, { Component } from 'react';
import { store } from '../helpers/reducers';

export default class Redux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0,
    };
  }

  render () {
    return (
      <div>
        <h2>Redux</h2>
        <h2>{store.getState()}</h2>
        <button
          onClick={
            () => {
              store.dispatch({ type: 'INC', payload: 1 });
              this.setState({
                val: store.getState(),
              });
            }
          }
          >Add</button>
        <button
          onClick={
            () => {
              store.dispatch({ type: 'DEC', payload: 1 });
              this.setState({
                val: store.getState(),
              });
            }
          }
          >R</button>
      </div>
    );
  }
}
