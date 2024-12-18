// src/pages/TodoView.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTodoById } from '../services/todoService';
import { Typography, Box, Paper, Button as MuiButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TodoView = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await getTodoById(id);
      setTodo(data.data);
    };
    fetchTodo();
  }, [id]);

  if (!todo) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ padding: 3, width: '100%', maxWidth: 600, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          {todo.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {todo.description}
        </Typography>
        <MuiButton
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{ marginTop: 2 }}
        >
          Back to List
        </MuiButton>
      </Paper>
    </Box>
  );
};

export default TodoView;
