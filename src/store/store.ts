import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contributionSlice from "../store/reducers/ApiSlice";

const rootReducers = combineReducers({
  contributionSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
  });
};

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
