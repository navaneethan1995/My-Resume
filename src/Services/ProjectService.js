// src/services/ProjectService.js
import { API } from '../api';

export const getProjects = () => API.get('/projects');

export const getProject = (id) => API.get(`/projects/${id}`);

export const createProject = (project) => API.post('/projects', project);

export const updateProject = (id, project) => API.put(`/projects/${id}`, project);

export const deleteProject = (id) => API.delete(`/projects/${id}`);
