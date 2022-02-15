// src/services/AuthService.js

import axios from 'axios';

const url = 'http://127.0.0.1:8000/api/auth/';
const productUrl = 'http://127.0.0.1:8000/api/';
const adminUrl = 'http://127.0.0.1:8000/api/admin/'

export default {
  refresh(refresh_token){
    return axios.post('http://127.0.0.1:8000/api/token/refresh/',{'refresh':refresh_token} )
    .then(response => response.data)
  },
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
    console.log(token)
    return axios.get(url + 'logout', {headers:{'Authorization': `Bearer ${token}`}}).then(response => response.data);
  },
  deactivate(token) {
    return axios
      .get(url + 'deactivate',  {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data);
  },


  latestProducts(){
    return axios
      .get(productUrl+'latestproduct/')
      .then(response => response.data)
      .catch(error=>error);

  },
  productsList(page=1){
    return axios
      .get(productUrl+`products/?page=${page}`)
      .then(response => response.data)
      .catch(error=>error);
  },
  categoryList(){
    return axios
      .get(productUrl+'categories/')
      .then(response => response.data)
      .catch(error=>error);
  },
  productDetail(category_slug, product_slug){
    return axios
      .get(productUrl+`products/${category_slug}/${product_slug}/`)
      .then(response => response.data)
      .catch(error=>error);
  },
  categoryDetail(category_slug){
    return axios
      .get(productUrl+`category/${category_slug}/`)
      .then(response => response.data)
      .catch(error=>error);
  },
  searchProduct(query){
    return axios
      .post(productUrl+'products/search/', {'query':query})
      .then(response => response.data)
      .catch(error=>error);
  },
  checkout(data,token){
    return axios
      .post(productUrl+'cart/checkout',data, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  orderList(token){
    return axios
      .get(productUrl+'cart/myorders',{headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },





  //admin api's
  addCategory(data, token){
    return axios
      .post(adminUrl+'add-category', data, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  editCategory(data, token, categorySlug){
    return axios
      .post(adminUrl+`edit-category/${categorySlug}/`, data, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  deleteCategory( token, categorySlug){
    return axios
      .get(adminUrl+`delete-category/${categorySlug}/`, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },


  addProduct(data, token){
    return axios
      .post(adminUrl+'add-product', data, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  editProduct(data, token, id){
    return axios
      .post(adminUrl+`edit-product/${id}`, data, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  deleteProduct(token, id){
    return axios
      .get(adminUrl+`delete-product/${id}`, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },


  salesByCategory(token){
    return axios
      .get(adminUrl+'sales-category', {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  salesByVendor(token){
    return axios
      .get(adminUrl+'sales-vendor', {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  top10Product(){
    return axios
      .get(adminUrl+'top10products')
      .then(response => response.data)
      .catch(error=>error);
  },
  top10Vendor(token){
    return axios
      .get(adminUrl+'top10vendors', {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  top10ProductForMonth(token){
    return axios
      .get(adminUrl+'top10products/month', {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  top10VendorForMonth(token){
    return axios
      .get(adminUrl+'top10vendors/month', {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  productChangesLog(token){
    console.log(token);
    return axios
      .get(adminUrl+'products-changes-log', {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error);
  },
  deleteProductChangesLog(token, id){
    return axios
      .get(adminUrl+`products-changes-log/delete/${id}`, {headers:{'Authorization': `Bearer ${token}`}})
      .then(response => response.data)
      .catch(error=>error)
  },
};