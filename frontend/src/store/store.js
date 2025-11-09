import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import articleReducer from "./slices/articleSlice";
import departmentReducer from "./slices/departmentSlice";
import departmentSourceReducer from "./slices/departmentSourceSlice";
import categotyReducer from "./slices/categorySlice";

const persistConfig = {
  key: "root", // key 'root' để đảm bảo redux-persist lưu toàn bộ store
  storage,
  whitelist: ["auth"], // Chỉ lưu reducer 'auth'
};

const rootReducer = combineReducers({
  auth: authReducer,
  article: articleReducer,
  department: departmentReducer,
  departmentSource: departmentSourceReducer,
  category: categotyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Bỏ qua kiểm tra serializable
    }),
});

export const persistor = persistStore(store);
export default store;
