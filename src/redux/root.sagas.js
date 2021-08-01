import { all, call } from "redux-saga/effects";
import albumsSaga from "./albums/albums.sagas";
import commentsSaga from "./comments/comments.sagas";
import photosSaga from "./photos/photos.sagas";
import postsSaga from "./posts/posts.sagas";
import todosSaga from "./todos/todos.sagas";
import usersSaga from "./users/users.sagas";

export default function* rootSaga() {
  yield all([
    call(albumsSaga),
    call(commentsSaga),
    call(photosSaga),
    call(postsSaga),
    call(todosSaga),
    call(usersSaga),
  ]);
}
