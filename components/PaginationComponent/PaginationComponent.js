import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({ setPage, page, count }) {
  const handleChange = (e, p) => {
    setPage(parseInt(p, 10));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
