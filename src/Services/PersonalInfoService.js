import { API } from '../api';


export const getPersonalInfo = () => API.get('/personal-info');


export const createPersonalInfo = (info) => API.post('/personal-info', info);


export const updatePersonalInfo = (id, info) => {
  if (info instanceof FormData) {
    info.append('_method', 'PUT'); 
    return API.post(`/personal-info/${id}`, info); 
  }
  return API.put(`/personal-info/${id}`, info); 
};


export const deletePersonalInfo = (id) => API.delete(`/personal-info/${id}`);
