import { combineReducers, configureStore } from "@reduxjs/toolkit";
import meetupApi from "./services/meetup";
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  [meetupApi.reducerPath]: meetupApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(meetupApi.middleware),
    preloadedState,
  });
}
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
