import axios from 'axios';

const userUrl = '/api/user';

export function loggedIn() {
  if (localStorage.getItem('token') !== null) {
    return true;
  }

  if (localStorage.getItem('token') === null) {
    axios.get(userUrl)
      .then(res => {
        if (res.data.token === null) {
          // window.location.replace('/login');
          return false;
        } else {
          localStorage.setItem('token', res.data.token);
          return true;
        }
      });
  }
}
// export function loggedIn() {
//   axios.get(userUrl)
//     .then(res => {
//       if (res.data.user === null) {
//         window.location.replace('/login');
//       }
//     });
// }

export const rootUrl = 'https://react-eko.herokuapp.com/api';
