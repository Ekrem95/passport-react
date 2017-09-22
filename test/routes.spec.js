const http = require('http');

const addr = 'http://localhost:3000/';

test('/', () => {
  http.get(addr, (res) => {
    expect(res.statusCode).toEqual(200);
  });
});

test('user before login', () => {
  http.get(addr + 'api/user', (res) => {
    expect(res.statusCode).toEqual(404);
  });
});
