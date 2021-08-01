import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import albumReducer from "./albums/albums.reducer";
import commentReducer from "./comments/comments.reducer";
import photoReducer from "./photos/photos.reducer";
import postReducer from "./posts/posts.reducer";
import todoReducer from "./todos/todos.reducer";
import userReducer from "./users/users.reducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  albums: albumReducer,
  comments: commentReducer,
  photos: photoReducer,
  posts: postReducer,
  todos: todoReducer,
  users: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
