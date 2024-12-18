// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from '../pages/TodoList';
import TodoForm from '../pages/TodoForm';
import TodoView from '../pages/TodoView';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <TodoForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <TodoForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view/:id"
        element={
          <ProtectedRoute>
            <TodoView />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
