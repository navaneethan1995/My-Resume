// src/services/SkillService.js
import { API } from '../api';

export const getSkills = () => API.get('/skills');

export const getSkill = (id) => API.get(`/skills/${id}`);

export const createSkill = (skill) => API.post('/skills', skill);

export const updateSkill = (id, skill) => API.put(`/skills/${id}`, skill);

export const deleteSkill = (id) => API.delete(`/skills/${id}`);
