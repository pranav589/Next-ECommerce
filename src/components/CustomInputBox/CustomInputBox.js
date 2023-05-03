import { Box, TextField, Typography } from "@mui/material";
import React from "react";

function CustomInputBox({
  id,
  label,
  name,
  value,
  onChange,
  errorValue,
  inputStyle,
  containerStyle,
  required,
  readOnly = false,
  type = "text",
  size,
}) {
  return (
    <Box sx={{ ...containerStyle }}>
      <TextField
        margin="normal"
        required={required}
        sx={{
          ...inputStyle,
        }}
        id={id}
        label={label}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        fullWidth
        inputProps={{
          readOnly: readOnly,
        }}
        type={type}
        size={size}
      />
      {errorValue && (
        <Typography sx={{ color: "red", fontSize: "12px" }}>
          {errorValue}
        </Typography>
      )}
    </Box>
  );
}

export default CustomInputBox;
