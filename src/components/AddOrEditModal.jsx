/* eslint-disable react/prop-types */
import { LoadingButton } from "@mui/lab";
import { Box, Modal, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddOrEditModal = ({
  handleClose,
  isEditMode,
  name,
  setName,
  isAddTodoLoading,
  isEditTodLoading,
  editTheTodo,
  addANewTodo,
  open,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          id="modal-modal-text"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          {isEditMode ? "Edit Todo Item" : "Add Todo Item"}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            label="Todo Name"
            required
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <LoadingButton
            size="small"
            endIcon={<SendIcon />}
            loading={isAddTodoLoading || isEditTodLoading}
            loadingPosition="end"
            variant="contained"
            onClick={isEditMode ? editTheTodo : addANewTodo}
          >
            <span>{isEditMode ? "Edit Todo" : "Add Todo"}</span>
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddOrEditModal;
