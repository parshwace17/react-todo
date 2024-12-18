// src/components/TextField.jsx
import React from "react";
import { TextField as MuiTextField } from "@mui/material";

const TextField = ({ label, error, helperText, ...props }) => (
  <MuiTextField
    label={label}
    error={!!error}
    helperText={error ? helperText : ""}
    fullWidth
    {...props}
  />
);

export default TextField;
