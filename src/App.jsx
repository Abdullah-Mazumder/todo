import { Box, Button, CircularProgress, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {
  useAddTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "./redux/features/todo/todoAPI";
import shortid from "shortid";
import { useEffect, useState } from "react";
import SingleTodoItem from "./components/SingleTodoItem";
import AddOrEditModal from "./components/AddOrEditModal";

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // handle add or edit modal open
  const handleOpen = () => {
    setIsEditMode(false);
    setName("");
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

  // this hook for editing a todo
  const [
    editTodo,
    { isLoading: isEditTodLoading, isSuccess: isEditTodoSuccess },
  ] = useEditTodoMutation();

  // when a new todo is created successfully then reset the form
  useEffect(() => {
    if (isAddTodoSuccess) {
      setOpen(false);
      setName("");
    }
  }, [isAddTodoSuccess]);

  useEffect(() => {
    if (isEditTodoSuccess) {
      setOpen(false);
      setName("");
      setIsEditMode(false);
      setEditId(null);
    }
  }, [isEditTodoSuccess]);

  const addANewTodo = () => {
    if (!name) return;

    const data = {
      text: name,
    };

    addTodo(data);
  };

  const editModeHandler = (id) => {
    const todo = todos.data.find((t) => t.id === id);
    setName(todo.text);
    setIsEditMode(true);
    setEditId(id);
    setOpen(true);
  };

  const editTheTodo = () => {
    if (!name) return;

    const data = {
      text: name,
    };

    editTodo({ data, id: editId });
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
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={handleOpen}>
                  Add Todo
                </Button>
              </Box>
              {todos?.data?.length > 0 ? (
                <Box sx={{ mt: 3 }}>
                  {todos.data.map((todo) => (
                    <SingleTodoItem
                      editModeHandler={editModeHandler}
                      todo={todo}
                      key={shortid.generate()}
                    />
                  ))}
                </Box>
              ) : (
                <Typography
                  sx={{ fontWeight: 500, fontSize: 20, mt: 2 }}
                  component="h1"
                >
                  Your Todo List is Empty!!
                </Typography>
              )}
            </>
          )}
        </Box>
      )}

      <AddOrEditModal
        addANewTodo={addANewTodo}
        editTheTodo={editTheTodo}
        handleClose={handleClose}
        isAddTodoLoading={isAddTodoLoading}
        isEditMode={isEditMode}
        isEditTodLoading={isEditTodLoading}
        name={name}
        open={open}
        setName={setName}
      />
    </>
  );
}

export default App;
