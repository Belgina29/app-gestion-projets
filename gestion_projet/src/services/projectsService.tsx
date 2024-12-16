import api from './api';

export const getAllProjects = async () => {
  const response = await api.get('/projects'); 
  return response.data;
};

export const createProject = async (projectData: any) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};
