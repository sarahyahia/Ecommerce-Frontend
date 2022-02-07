// src/services/AuthService.js

import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/auth/';
const productUrl = 'http://127.0.0.1:8000/api/';
const adminUrl = 'http://127.0.0.1:8000/api/admin/'

export default {
  login(credentials) {
    return axios
      .post(url + 'login', credentials)
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
  deactivate(token) {
    return axios
      .get(url + 'deactivate',  {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data);
  },


  latestProducts(){
    return axios
      .get(productUrl+'latestproduct/')
      .then(response => response.data)

  },
  productsList(page=1){
    return axios
      .get(productUrl+`products/?page=${page}`)
      .then(response => response.data)
  },
  categoryList(){
    return axios
      .get(productUrl+'categories/')
      .then(response => response.data)
  },
  productDetail(category_slug, product_slug){
    return axios
      .get(productUrl+`products/${category_slug}/${product_slug}/`)
      .then(response => response.data)
  },
  categoryDetail(category_slug){
    return axios
      .get(productUrl+`category/${category_slug}/`)
      .then(response => response.data)
  },
  searchProduct(query){
    return axios
      .post(productUrl+'products/search/', {'query':query})
      .then(response => response.data)
  },
  checkout(data,token){
    return axios
      .post(productUrl+'cart/checkout',data, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },
  orderList(token){
    return axios
      .get(productUrl+'cart/myorders',{headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },





  //admin api's
  addCategory(data, token){
    return axios
      .post(adminUrl+'add-category', data, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },
  editCategory(data, token, categorySlug){
    return axios
      .post(adminUrl+`edit-category/${categorySlug}/`, data, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },
  deleteCategory( token, categorySlug){
    return axios
      .get(adminUrl+`delete-category/${categorySlug}/`, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },


  addProduct(data, token){
    return axios
      .post(adminUrl+'add-product', data, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },
  editProduct(data, token, id){
    return axios
      .post(adminUrl+`edit-product/${id}`, data, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },
  deleteProduct(token, id){
    return axios
      .get(adminUrl+`delete-product/${id}`, {headers:{'Authorization': `token ${token}`}})
      .then(response => response.data)
  },

};