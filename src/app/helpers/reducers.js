import { createStore } from 'redux';

// const reducer = (state, action) => {
//   if (action.type === 'DEC') {
//     return state = state - 1;
//   }
//
//   if (action.type === 'INC') {
//     return state = state + 1;
//   }
//
//   return state;
// };
const reducer = (state, action) => {
  if (action.type === 'AUTH') {
    return state = 1;
  }

  if (action.type === 'UNAUTH') {
    return state = 0;
  }

  return state;
};

// const val = localStorage.getItem('token') === null ? 0 : 1;

export const store = createStore(reducer, 6);

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch({ type: 'AUTH' });
