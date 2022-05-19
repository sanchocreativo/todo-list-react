import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todos from './todos';
import { loadState } from './localStorage';
const rootReducer = combineReducers({
  todos: todos.reducer,
});

const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState: loadState(),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
