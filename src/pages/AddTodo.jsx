/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useAddTodoMutation } from "../redux/features/todo/todoAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // this hook for adding a new todo
  const [
    addTodo,
    {
      isLoading: isAddTodoLoading,
      isSuccess: isAddTodoSuccess,
      isError: isAddTodoError,
    },
  ] = useAddTodoMutation();

  // when a new todo is created successfully then reset the form
  useEffect(() => {
    if (isAddTodoSuccess) {
      setName("");
      toast.success("Todo Created Successfully!");
      navigate("/");
    }
  }, [isAddTodoSuccess]);

  useEffect(() => {
    if (isAddTodoError) {
      toast.error("Something went wrong!");
    }
  }, [isAddTodoError]);

  const addANewTodo = () => {
    if (!name) return;

    const data = {
      text: name,
    };

    addTodo(data);
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
          <Typography sx={{ fontWeight: "bold", fontSize: 22 }} component="h1">
            Add A New Todo
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                size="small"
                label="Todo Name"
                required
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box sx={{ mt: 2, display: "flex" }}>
              <LoadingButton
                size="small"
                endIcon={<SendIcon />}
                loading={isAddTodoLoading}
                loadingPosition="end"
                variant="contained"
                onClick={addANewTodo}
              >
                <span>Add Todo</span>
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddTodo;
