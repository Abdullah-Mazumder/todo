/* eslint-disable react/prop-types */
import { Box, Checkbox, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteTodoMutation } from "../redux/features/todo/todoAPI";

const SingleTodoItem = ({ todo, editModeHandler }) => {
  const { text, completed, id } = todo;

  // this hook for deleting a todo
  const [deleteTodo] = useDeleteTodoMutation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid gray",
        mb: 1,
        px: 1,
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 20,
          textAlign: "start",
        }}
        component="h1"
      >
        {text}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 5, ml: 3 }}>
        <Box>
          <Checkbox checked={completed} disabled />
        </Box>
        <EditIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            editModeHandler(id);
          }}
        />
        <DeleteIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            deleteTodo(id);
          }}
        />
      </Box>
    </Box>
  );
};

export default SingleTodoItem;
