import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {
  useAddTodoMutation,
  useChangeCompleteStatusMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "./redux/features/todo/todoAPI";
import shortid from "shortid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
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

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // handle add or edit modal open
  const handleOpen = () => {
    setIsEditMode(false);
    setName("");
    setColor("");
    setEditId(null);
    setOpen(true);
  };

  // handle add or edit modal close
  const handleClose = () => setOpen(false);

  // this hook for getting all the todos
  const {
    data: todos,
    isLoading: getTodosLoading,
    isError: getTodosError,
  } = useGetTodosQuery();

  // this hook for adding a new todo
  const [
    addTodo,
    { isLoading: isAddTodoLoading, isSuccess: isAddTodoSuccess },
  ] = useAddTodoMutation();

  // this hook for changing complete status of a todo
  const [changeCompleteStatus] = useChangeCompleteStatusMutation();

  // this hook for editing a todo
  const [editTodo] = useEditTodoMutation();

  // this hook for deleting a todo
  const [deleteTodo] = useDeleteTodoMutation();

  // when a new todo is created successfully then reset the form
  useEffect(() => {
    if (isAddTodoSuccess) {
      setOpen(false);
      setName("");
      setColor("");
    }
  }, [isAddTodoSuccess]);

  const addANewTodo = () => {
    if (!name) return;

    const data = {
      text: name,
      completed: false,
    };

    if (color) {
      data.color = { name: color };
    }

    addTodo(data);
  };

  const editModeHandler = (id) => {
    const todo = todos.find((t) => t.id === id);
    setName(todo.text);
    if (todo.color) {
      setColor(todo.color.name);
    }
    setIsCompleted(todo.completed);
    setIsEditMode(true);
    setEditId(id);
    setOpen(true);
  };

  const editTheTodo = () => {
    if (!name) return;

    const data = {
      text: name,
      color: null,
      id: editId,
      completed: isCompleted,
    };

    if (color) {
      data.color = { name: color };
    }

    editTodo({ data, id: editId });
    setOpen(false);
    setName("");
    setColor("");
  };

  return (
    <>
      <CssBaseline />
      {getTodosError ? (
        // when error occured during request
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 22 }} component="h1">
            Something Went Wrong
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 22 }} component="h1">
            All Todo Items
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleOpen}>
              Add Todo
            </Button>
          </Box>

          {getTodosLoading ? (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                mt: 5,
              }}
            >
              <CircularProgress size={25} />
            </Box>
          ) : (
            <>
              {todos.length > 0 ? (
                <Box sx={{ mt: 3 }}>
                  {todos.map(({ text, completed, id, color }) => (
                    <Box
                      key={shortid.generate()}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 20 }}
                        component="h1"
                      >
                        {text}
                      </Typography>
                      <Box>
                        <Checkbox
                          checked={completed}
                          onChange={() => {
                            changeCompleteStatus({
                              data: {
                                id,
                                text,
                                completed: !completed,
                                color,
                              },
                              id: id,
                            });
                          }}
                        />
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
                  ))}
                </Box>
              ) : (
                <Typography
                  sx={{ fontWeight: 500, fontSize: 20 }}
                  component="h1"
                >
                  Your Todo List is Empty!!
                </Typography>
              )}
            </>
          )}
        </Box>
      )}

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
            <TextField
              fullWidth
              label="Todo Color"
              variant="outlined"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Box>

          <Box sx={{ mt: 2 }}>
            <LoadingButton
              size="small"
              endIcon={<SendIcon />}
              loading={isAddTodoLoading}
              loadingPosition="end"
              variant="contained"
              onClick={isEditMode ? editTheTodo : addANewTodo}
            >
              <span>{isEditMode ? "Edit Todo" : "Add Todo"}</span>
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default App;
