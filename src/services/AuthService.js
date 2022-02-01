// src/services/AuthService.js

import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/auth/';
const productUrl = 'http://127.0.0.1:8000/api/';
const headers = {
  'Content-Type': 'application/json',
};

export default {
  login(credentials) {
    return axios
      .post(url + 'login', credentials, {headers: headers})
      .then(response => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + 'register', credentials)
      .then(response => response.data);
  },
  logout(token) {
    return axios.get(url + 'logout', {headers:{'Authorization': `token ${token}`}}).then(response => response.data);
  },


  latestProducts(){
    return axios
      .get(productUrl+'latestproduct/')
      .then(response => response.data)

  }
};