// src/services/AuthService.js

import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/auth/';
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
  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  }
};