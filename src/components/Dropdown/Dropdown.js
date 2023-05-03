import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function Dropdown({
  data = [],
  defaultValue = "",
  title = "",
  setSelectedValue = () => {},
}) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: "10px", marginBottom: "10px" }}>
      <InputLabel>{title}</InputLabel>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
          defaultValue={defaultValue}
          variant="standard"
          renderValue={(selected) => {
            if (!selected) {
              return <Typography>View</Typography>;
            } else {
              return <Typography>{value}</Typography>;
            }
          }}
        >
          {data?.map((item) => (
            <MenuItem
              value={item?.name}
              key={item?._id}
              onClick={() => setSelectedValue(item)}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
