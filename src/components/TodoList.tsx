import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, AppDispatch } from '../store/store';
import todoSlice from '../store/todos';

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: AppState) => state.todos);
  return (
    <div className="todoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={cn('todo', {
            completeTodo: todo.completed,
          })}
        >
          <input
            className="todoCheck"
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(todoSlice.actions.completeTodo(todo.id))}
          />
          <span className="todoMessage">{todo.message}</span>
          <button
            type="button"
            className="todoDelete"
            onClick={() => dispatch(todoSlice.actions.deleteTodo(todo.id))}
          >
            X
          </button>
        </div>
      ))}
      <button onClick={() => dispatch(todoSlice.actions.sort())}>
        Sort 'em!
      </button>
    </div>
  );
};

export default TodoList;
