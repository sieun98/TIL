import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { addTodo, completeTodo, showComplete, showAll } from "./redux/actions";
import ReduxContext from "./contexts/ReduxContext";

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch(addTodo("구직활동"));
// store.dispatch(addTodo("리덕스 강의듣기"));
// store.dispatch(addTodo("자소서쓰기"));
// store.dispatch(completeTodo(1));
// store.dispatch(showComplete());
// store.dispatch(showAll());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxContext.Provider value={store}>
      <App />
    </ReduxContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
