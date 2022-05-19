import * as React from "react";
import {createRoot} from 'react-dom/client';

import { Provider } from "react-redux";
import store from "./store/store";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { debounce } from "debounce";
import { saveState } from "./store/localStorage";

import "./index.scss";

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h2>Todo List</h2>
        <TodoInput />
        <TodoList />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<App />);
