import { fork } from "redux-saga/effects";
import diarySaga from "./modules/diary";

export default function* rootSaga() {

  yield fork(diarySaga);

}
