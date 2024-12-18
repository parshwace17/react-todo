// src/pages/TodoList.jsx
import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo } from '../services/todoService';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [selectedTodoId, setSelectedTodoId] = useState(null); // Store the ID of the todo to delete
  const navigate = useNavigate(); // Use navigate from React Router

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data.data);
    };
    fetchTodos();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedTodoId(id);
    setOpen(true); // Open the dialog when the delete button is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog without deleting
    setSelectedTodoId(null);
  };

  const handleDelete = async () => {
    if (selectedTodoId !== null) {
      await deleteTodo(selectedTodoId);
      setTodos(todos.filter((todo) => todo.id !== selectedTodoId)); // Remove the deleted todo from state
    }
    handleClose(); // Close the dialog after deletion
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to edit without reloading the page
  };

  const handleView = (id) => {
    navigate(`/view/${id}`); // Navigate to view without reloading the page
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom align="center">
        Todo List
      </Typography>

      {/* Add Todo Button */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Link to="/add">
          <Button variant="contained" color="primary">
            Add Todo
          </Button>
        </Link>
      </Box>

      {/* MUI Table for Todo List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.name}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(todo.id)}
                    color="primary"
                    variant="contained"
                    style={{ marginRight: '8px' }}
                    startIcon={<EditIcon />} // Add Edit Icon
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleView(todo.id)}
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: '8px' }}
                    startIcon={<VisibilityIcon />} // Add View Icon
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(todo.id)}
                    color="error"
                    variant="contained"
                    startIcon={<DeleteIcon />} // Add Delete Icon
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MUI Dialog for Confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this todo?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
