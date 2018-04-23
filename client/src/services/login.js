import { parseJSON, checkStatus } from './generic';

export const login = (email, password) => {
  return fetch('api/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(checkStatus)
    .then(parseJSON)
};