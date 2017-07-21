import axios from 'axios';

const userUrl = '/api/user';

export function loggedIn() {
  if (localStorage.getItem('token') !== null) {
    return true;
  }

  if (localStorage.getItem('token') === null) {
    return false;
  }
}

export const rootUrl = 'https://react-eko.herokuapp.com/api/';
export const postDetails = 'https://react-eko.herokuapp.com/p/d';
