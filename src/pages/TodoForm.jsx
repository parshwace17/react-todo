// src/pages/TodoForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTodo, updateTodo, getTodoById } from '../services/todoService';
import TextField from '../components/TextField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';

const TodoForm = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({ name: '', description: '' });
  const [errors, setErrors] = useState({ name: '', description: '' });
  const navigate = useNavigate(); // Use navigate from React Router

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        const data = await getTodoById(id);
        setTodo(data.data);
      };
      fetchTodo();
    }
  }, [id]);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', description: '' };

    if (!todo.name.trim()) {
      newErrors.name = 'Title is required';
      isValid = false;
    }

    if (!todo.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Prevent form submission if validation fails

    if (id) {
      await updateTodo(id, todo);
    } else {
      await createTodo(todo);
    }
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom align="center">
          {id ? 'Edit Todo' : 'Add Todo'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={todo.name}
            onChange={(e) => setTodo({ ...todo, name: e.target.value })}
            fullWidth
            style={{ marginBottom: '16px' }}
            error={Boolean(errors.name)} // Show error if there's an error
            helperText={errors.name} // Display the error message
          />
          <TextField
            label="Description"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
            style={{ marginBottom: '16px' }}
            error={Boolean(errors.description)} // Show error if there's an error
            helperText={errors.description} // Display the error message
          />
          <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
          {id ? 'Update' : 'Add'} Todo
            </Button>
            <Button onClick={() => navigate('/')} color="secondary" variant="outlined">
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default TodoForm;
