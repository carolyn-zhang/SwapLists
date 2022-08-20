// import axios from 'axios'
// const baseUrl = '/api/list'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

// export default {
//   getAll,
//   create,
//   update
// }

import http from "../http-common";

class ListService {

  getAll(id) {
    return http.get(`/items/${id}`);
  }

  get(id) {
    return http.get(`/item/${id}`);
  }

  getList(id) {
    return http.get(`/lists/${id}`)
  }

  create(data) {
    return http.post("/item", data);
  }

  createList(listData) {
    return http.post("/lists", listData);
  }

  update(id, data) {
    return http.put(`/item/${id}`, data);
  }

  updateList(id, listData) {
    return http.put(`/lists/${id}`, listData)
  }

  // toggleCheck(id) {
  //   return http.put(`/item/${id}`);
  // }

  delete(id) {
    return http.delete(`/item/${id}`);
  }
  
  deleteList(id) {
    return http.delete(`/lists/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new ListService();
