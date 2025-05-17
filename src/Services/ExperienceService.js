
import { API } from '../api';

export const getExperiences = () => API.get('/experiences');

export const getExperience = (id) => API.get(`/experiences/${id}`);

export const createExperience = (data) => API.post('/experiences', data);

export const updateExperience = (id, data) => API.put(`/experiences/${id}`, data);

export const deleteExperience = (id) => API.delete(`/experiences/${id}`);
