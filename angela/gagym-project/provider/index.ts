import { configureStore } from "@reduxjs/toolkit";

import progressReducer from "./modules/progress";


import rootSaga from "../middleware";
import createSagaMiddleware from "@redux-saga/core";

import diaryReduer from "./modules/diary";


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    diary: diaryReduer,

    progress: progressReducer,
  },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
