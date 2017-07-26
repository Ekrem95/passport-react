import axios from 'axios';

const userUrl = '/api/user';

export function auth(component) {
  if (localStorage.getItem('token') === null) {
    component.props.history.push('/login');
  }
}

export function loggedIn() {
  if (localStorage.getItem('token') === null) {
    return false;
  } else {
    return true;
  }
}

export const rootUrl = 'https://react-eko.herokuapp.com/api/';
export const postDetails = 'https://react-eko.herokuapp.com/p/d';
export const editPost = 'https://react-eko.herokuapp.com/p';
export const addPost = 'https://react-eko.herokuapp.com/add';
