import { parseJSON, checkStatus } from './generic';

export const addWord = (word, translation) => {
  return fetch('api/addword', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word, translation })
  })
    .then(checkStatus)
    .then(parseJSON)
};

export const addWords = file => {
  const formData = new FormData();
  formData.append('file', file);

  return fetch('api/addwords', {
    method: 'post',
    body: formData
  })
    .then(checkStatus)
    .then(parseJSON)
};