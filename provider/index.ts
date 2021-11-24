import { configureStore } from "@reduxjs/toolkit";
import reservationReduer from "./modules/reservation"
import progressReducer from "./modules/progress";
import alertReducer from "./modules/alert";
import diaryReducer from "./modules/diary";


import rootSaga from "../middleware";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();


export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    progress: progressReducer,
    alert: alertReducer,
    reservation: reservationReduer
  },

  middleware: [sagaMiddleware],
  devTools: true,
});


sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;