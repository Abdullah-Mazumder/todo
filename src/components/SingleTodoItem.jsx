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
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: 20 }} component="h1">
        {text}
      </Typography>
      <Box>
        <Checkbox checked={completed} disabled />
      </Box>
      <Box sx={{ display: "flex", gap: 2, ml: 3 }}>
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
