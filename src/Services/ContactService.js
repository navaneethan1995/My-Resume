import { API } from '../api';

export const getContacts = () => API.get('/contacts');

export const getContact = (id) => API.get(`/contacts/${id}`);

export const createContact = (data) => API.post('/contacts', data);

export const updateContact = (id, data) => API.put(`/contacts/${id}`, data);

export const deleteContact = (id) => API.delete(`/contacts/${id}`);

export const sendMessage = (data) => API.post('/send-message', data);
