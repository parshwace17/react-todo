// src/services/todoService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1/items'; // Replace with your backend URL

export const getTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getTodoById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_BASE_URL, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
