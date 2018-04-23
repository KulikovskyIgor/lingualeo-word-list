const axios = require('axios');

let cookie = null;

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    axios(`http://api.lingualeo.com/login?utm_source=ll_plugin&utm_medium=plugin&utm_campaign=options&email=${email}&password=${password}`, {
      method: "post",
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(function (response) {
        cookie = response.headers['set-cookie'];
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.message);
      });
  });
};

const addWord = (word, translation) => {
  return new Promise((resolve, reject) => {
    axios('http://api.lingualeo.com/addword', {
      method: "post",
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Cookie': cookie
      },
      data: {
        word,
        tword: translation
      },
    })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error.message);
      });
  });
};

exports.login = login;
exports.addWord = addWord;