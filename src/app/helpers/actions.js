import axios from 'axios';

const userUrl = '/api/user';

export function auth() {
  if (localStorage.getItem('token') === null) {
    return false;
  } else {
    return true;
  }
}

export const rootUrl = 'https://react-eko.herokuapp.com/api/';
export const postDetails = 'https://react-eko.herokuapp.com/p/d';
