import { createStore } from 'redux';

const reducer = (state, action) => {
  if (action.type === 'INC') {
    return state + action.payload;
  }

  if (action.type === 'DEC') {
    return state - action.payload;
  }

  return state;
};

const val = localStorage.getItem('token') === null ? 0 : 1;

export const store = createStore(reducer, val);

// store.subscribe(() => {
//   console.log('store changed', store.getState());
// });

// store.dispatch({ type: 'INC', payload: 1 });
