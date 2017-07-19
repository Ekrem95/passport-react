import axios from 'axios';

const userUrl = '/api/user';

export function loggedIn() {
  axios.get(userUrl)
    .then(res => {
      if (res.data.user === null) {
        window.location.replace('/login');
      }
    });
}

export const rootUrl = 'https://react-eko.herokuapp.com/api';
