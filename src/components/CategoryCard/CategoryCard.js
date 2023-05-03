import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CustomModal from "../Modal/CustomModal";

function CategoryCard({
  card = {},
  handleDelete = () => {},
  handleEdit = () => {},
  modalMessage = "",
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <Paper
      sx={{
        width: "50%",
        marginTop: "8px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: "18px" }}>{card?.name}</Typography>
        <Typography sx={{ fontSize: "13px", color: "crimson" }}>
          {new Date(card?.expiry) < new Date(Date.now())
            ? "Expired"
            : `Expiry Date: ${new Date(card?.expiry).toLocaleDateString()}`}
        </Typography>
      </Box>

      <Box>
        <IconButton onClick={() => setDeleteModalOpen(true)}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => handleEdit(card)}>
          <ModeEditOutlineIcon />
        </IconButton>

        <CustomModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          modalTitle={"Delete Category?"}
          agreedButtonName={"Delete"}
          declineButtonName={"Cancel"}
          handleAgreedButtonClick={() => handleDelete(card)}
          agreedButtonColor={"#539165"}
          declineButtonColor={"red"}
          showAgreedButton={true}
          showDeclineButton={true}
        >
          <Typography>{modalMessage}</Typography>
        </CustomModal>
      </Box>
    </Paper>
  );
}

export default CategoryCard;
