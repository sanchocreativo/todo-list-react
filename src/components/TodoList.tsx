import React, { useState} from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, AppDispatch } from '../store/store';
import todoSlice from '../store/todos';

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: AppState) => state.todos);
  
  const [ isEditing, setEditing ] = useState(false);
  const [ state, setState ] = useState({
   id: '', message: '' 
  });
  const onEditToggle = ( id:string, message:string) => {
   setEditing(true);
   setState({ ...state, id, message});
  }

  const handleChange = (e:any) =>{
   setState({...state, [e.target.name]: e.target.value });
  }
  const { message, id } = state;
  const edit = () => {
   if(message === ''){
    setState({...state});
    return;
   }
   dispatch((todoSlice.actions.editTodo({id: id, message: message, completed: false})));
   setEditing(false);
  }

  return (
    <div className="todoList">
      {
        isEditing &&
          <div className="todoInput">
              <input type='text' value={message} name='message' 
                onChange={handleChange}>
              </input>
              <button type='button' className='button' 
                onClick={edit}>Edit
            </button>
          </div>
      }
      {
        todos.length === 0 && <h5> No Todo list items! Add something to start</h5>
      }
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
          <div className="todoButtons">
            <button
              type="button"
              className="close"
              onClick={() => dispatch(todoSlice.actions.deleteTodo(todo.id))}
            >
            </button>
            <div
              title="edit"
              role="button"
              className="pencil"
              id="edit"
              onClick={() =>onEditToggle(todo.id, todo.message)}             
            >
            </div>
          </div>
        </div>
      ))}
      <button className="sort" onClick={() => dispatch(todoSlice.actions.sort())}>
        Sort todos
      </button>
    </div>
  );
};

export default TodoList;
