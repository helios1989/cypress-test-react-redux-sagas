import { createSelector } from "reselect";

export const selectTodos = (state) => state.todos;

export const selectTodosData = createSelector(
  [selectTodos],
  (todos) => todos.data
);

export const selectTodosErrorMessage = createSelector(
  [selectTodos],
  (todos) => todos.errorMessage
);

export const selectTodosFetchStatus = createSelector(
  [selectTodos],
  (todos) => todos.isFetching
);
