import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from "redux-persist";
import UserSlice from "./UserSlice";
import clientSlice from "./clientSlice";
import TemplateSlice from "./TemplateSlice";

const persistConfig = {
  key: "userData",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ user: UserSlice, client: clientSlice ,templateSlice:TemplateSlice});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const userStore = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(userStore);

export default userStore;
