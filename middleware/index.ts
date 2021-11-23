import { fork } from "redux-saga/effects";
import reservationSaga from "./modules/reservation";
import diarySaga from "./modules/diary";

export default function* rootSaga() {

  yield fork(reservationSaga);
  yield fork(diarySaga);
}
