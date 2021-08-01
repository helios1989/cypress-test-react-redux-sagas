import { takeLatest, put } from "redux-saga/effects";
import TodosActionTypes from "./todos.types";
import {
  fetchTodosFailure,
  fetchTodosSuccess,
  clearTodoMessages,
  editTodoFailure,
  editTodoSuccess,
  deleteTodoFailure,
  deleteTodoSuccess,
  addTodoFailure,
  addTodoSuccess,
} from "./todos.actions";
import axios from "../../utils/axios";

export function* fetchTodosStartAsync() {
  try {
    const Todos = yield axios.get("Todos").then((res) => res.data);
    yield put(fetchTodosSuccess(Todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

export function* editTodoStartAsync(action) {
  try {
    const Todo = action.payload;
    const editedTodo = yield axios
      .put(`Todos/${Todo.id}`, Todo)
      .then((res) => res.data);

    yield put(editTodoSuccess(editedTodo));
  } catch (error) {
    yield put(editTodoFailure(error.message));
  }
}

export function* addTodoStartAsync(action) {
  try {
    const Todo = action.payload;
    const TodoAdded = yield axios.post(`Todos/`, Todo).then((res) => res.data);

    yield put(addTodoSuccess(TodoAdded));
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

export function* deleteTodoStateAsync(action) {
  try {
    const id = action.payload;
    yield axios.delete(`Todos/${id}`).then((res) => res.status);

    yield put(deleteTodoSuccess(id));
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

export function* clearTodoMessagesStart() {
  yield put(clearTodoMessages());
}

//Not necessary unless you have more than one sagas exports
//The array should contain a list of actions to be listened to

export default function* TodosSaga() {
  yield takeLatest(TodosActionTypes.ADD_TODO_START, addTodoStartAsync);
  yield takeLatest(TodosActionTypes.EDIT_TODO_START, editTodoStartAsync);
  yield takeLatest(TodosActionTypes.DELETE_TODO_START, deleteTodoStateAsync);
  yield takeLatest(TodosActionTypes.FETCH_TODOS_START, fetchTodosStartAsync);
  yield takeLatest(
    [
      TodosActionTypes.DELETE_TODO_FAILURE,
      TodosActionTypes.DELETE_TODO_SUCCESS,
      TodosActionTypes.ADD_TODO_FAILURE,
      TodosActionTypes.ADD_TODO_SUCCESS,
      TodosActionTypes.EDIT_TODO_FAILURE,
      TodosActionTypes.EDIT_TODO_SUCCESS,
      TodosActionTypes.FETCH_TODOS_FAILURE,
      TodosActionTypes.FETCH_TODOS_SUCCESS,
    ],
    clearTodoMessagesStart
  );
}
