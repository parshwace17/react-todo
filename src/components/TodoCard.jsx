// src/components/TodoCard.jsx
import React from 'react';
import { Card, CardContent, Typography, CardActions } from '@mui/material';
import Button from './Button';

const TodoCard = ({ todo, onEdit, onDelete, onView }) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="h5">{todo.name}</Typography>
      <Typography variant="body2">{todo.description}</Typography>
    </CardContent>
    <CardActions>
      <Button onClick={() => onView(todo)}>View</Button>
      <Button onClick={() => onEdit(todo)}>Edit</Button>
      <Button onClick={() => onDelete(todo.id)} color="error">Delete</Button>
    </CardActions>
  </Card>
);

export default TodoCard;
