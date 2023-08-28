import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import TodoApp from "./TodoApp";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </>
);
