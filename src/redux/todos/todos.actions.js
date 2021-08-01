import todosActionTypes from "./todos.types";

export const clearTodoMessages = () => ({
  type: todosActionTypes.CLEAR_TODO_MESSAGES,
});

export const fetchTodosStart = () => ({
  type: todosActionTypes.FETCH_TODOS_START,
});

export const fetchTodosSuccess = (todos) => ({
  type: todosActionTypes.FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodosFailure = (errorMessage) => ({
  type: todosActionTypes.FETCH_TODOS_FAILURE,
  payload: errorMessage,
});

export const editTodoStart = (payload) => ({
  type: todosActionTypes.EDIT_TODO_START,
  payload,
});

export const editTodoSuccess = (todo) => ({
  type: todosActionTypes.EDIT_TODO_SUCCESS,
  payload: todo,
});

export const editTodoFailure = (errorMessage) => ({
  type: todosActionTypes.EDIT_TODO_FAILURE,
  payload: errorMessage,
});

export const addTodoStart = (payload) => ({
  type: todosActionTypes.ADD_TODO_START,
  payload,
});

export const addTodoSuccess = (todo) => ({
  type: todosActionTypes.ADD_TODO_SUCCESS,
  payload: todo,
});

export const addTodoFailure = (errorMessage) => ({
  type: todosActionTypes.ADD_TODO_FAILURE,
  payload: errorMessage,
});

export const deleteTodoStart = (payload) => ({
  type: todosActionTypes.DELETE_TODO_START,
  payload,
});

export const deleteTodoSuccess = (id) => ({
  type: todosActionTypes.DELETE_TODO_SUCCESS,
  payload: id,
});

export const deleteTodoFailure = (errorMessage) => ({
  type: todosActionTypes.DELETE_TODO_FAILURE,
  payload: errorMessage,
});
