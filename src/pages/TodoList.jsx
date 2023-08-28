import { Box, CircularProgress, Container, Typography } from "@mui/material";
import {
  useEditTodoMutation,
  useGetTodosQuery,
} from "../redux/features/todo/todoAPI";
import SingleTodoItem from "../components/SingleTodoItem";
import shortid from "shortid";
import EditTodoModal from "../components/EditTodoModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TodoList = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  // handle add or edit modal close
  const handleClose = () => setOpen(false);

  // this hook for getting all the todos
  const {
    data: todos,
    isLoading: getTodosLoading,
    isError: getTodosError,
  } = useGetTodosQuery();

  // this hook for editing a todo
  const [
    editTodo,
    {
      isLoading: isEditTodLoading,
      isSuccess: isEditTodoSuccess,
      isError: isEditTodoError,
    },
  ] = useEditTodoMutation();

  useEffect(() => {
    if (isEditTodoSuccess) {
      setOpen(false);
      setName("");
      setEditId(null);
      toast.success("Todo edited successfully!");
    }
  }, [isEditTodoSuccess]);

  useEffect(() => {
    if (isEditTodoError) {
      toast.error("Something went wrong!");
    }
  }, [isEditTodoError]);

  const editModeHandler = (id) => {
    const todo = todos.data.find((t) => t.id === id);
    setName(todo.text);
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
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            mt: 10,
          }}
        >
          {getTodosError ? (
            // when error occured during request
            <Typography
              sx={{ fontWeight: "bold", fontSize: 22 }}
              component="h1"
            >
              Something Went Wrong
            </Typography>
          ) : (
            <>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 22 }}
                component="h1"
              >
                All Todo Items
              </Typography>

              {getTodosLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    mt: 2,
                  }}
                >
                  <CircularProgress size={25} />
                </Box>
              ) : (
                <>
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
            </>
          )}
        </Box>
      </Container>

      <EditTodoModal
        editTheTodo={editTheTodo}
        handleClose={handleClose}
        isEditTodLoading={isEditTodLoading}
        name={name}
        open={open}
        setName={setName}
      />
    </>
  );
};

export default TodoList;
