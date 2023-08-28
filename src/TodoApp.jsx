import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const TodoApp = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<TodoList />} path="/" />
          <Route element={<AddTodo />} path="/add-todo" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default TodoApp;
