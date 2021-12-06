import diaryReducer, {
  addDiary,
  initialCompleted,
  initialPagedDiary,
  initialDiary,
  initialDiaryItem,
  modifyDiary,
  DiaryPage,
  removeDiary,
} from "../../provider/modules/diary";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { DiaryItem } from "../../provider/modules/diary";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { DiaryItemRequest, DiaryItemResponse, DiaryPagingResponse,} from "../../api/diary";
import { AxiosResponse } from "axios";

import { addAlert } from "../../provider/modules/alert";

export interface PageRequest {
  page: number;
  size: number;
}

export const requestAddDiary = createAction<DiaryItem>(
  `${diaryReducer.name}/requestAddDiary`
);

export const requestAddDiaryNext = createAction<DiaryItem>(
  `${diaryReducer.name}/requestAddDiaryNext`
);

export const requestFetchDiary = createAction(
  `${diaryReducer.name}/requestFetchDiary`
);

export const requestFetchPagingDiary = createAction<PageRequest>(
  `${diaryReducer.name}/requestFetchPagingDiary`
);

export const requestFetchNextDiary = createAction<PageRequest>(
  `${diaryReducer.name}/requestFetchNextDiary`
);

export const requestFetchDiaryItem = createAction<number>(
  `${diaryReducer.name}/requestFetchDiaryItem`
);

export const requestRemoveDiary = createAction<number>(
  `${diaryReducer.name}/requestRemoveDiary`
);

export const requestModifyDiary = createAction<DiaryItem>(
  `${diaryReducer.name}/requestModifyDiary`
);


//----------------------addData---------------------//
function* addData(action: PayloadAction<DiaryItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  try {
    const diaryItemPayload = action.payload;

    const diaryItemRequest: DiaryItemRequest = {
  memberName: diaryItemPayload.memberName,
  diaryMorning: diaryItemPayload.diaryMorning,
  diaryLunch: diaryItemPayload.diaryLunch,
  diaryDinner: diaryItemPayload.diaryDinner,
  diaryRoutine: diaryItemPayload.diaryRoutine,
  diaryRequest: diaryItemPayload.diaryRequest,
  trainerName: diaryItemPayload.trainerName,
  trainerFeedback: diaryItemPayload.trainerFeedback,
  diaryCreateTime: diaryItemPayload.diaryCreateTime, //1119 추가

    };

    const result: AxiosResponse<DiaryItemResponse> = yield call(
      api.add,
      diaryItemRequest
    );

    const diaryItem: DiaryItem = {
      id: result.data.id,
      memberName: result.data.memberName,
      diaryMorning: result.data.diaryMorning,
      diaryLunch: result.data.diaryLunch,
      diaryDinner: result.data.diaryDinner,
      diaryRoutine: result.data.diaryRoutine,
      diaryRequest: result.data.diaryRequest,
      trainerName: result.data.trainerName,
      trainerFeedback: result.data.trainerFeedback,
      diaryCreateTime: result.data.diaryCreateTime,

    };

    yield put(addDiary(diaryItem));

    yield put(initialCompleted());

  } catch (e: any) {

  }
}

//----------------------fetchData---------------------//
function* fetchData() {
  yield console.log("--fetchData--");
  const result: AxiosResponse<DiaryItemResponse[]> = yield call(api.fetch);
  const diary = result.data.map(
    (item) =>
      ({
      id: item.id,
      memberName: item.memberName,
      diaryMorning: item.diaryMorning,
      diaryLunch: item.diaryLunch,
      diaryDinner: item.diaryDinner,
      diaryRoutine: item.diaryRoutine,
      diaryRequest: item.diaryRequest,
      trainerName: item.trainerName,
      trainerFeedback: item.trainerFeedback,
      diaryCreateTime: item.diaryCreateTime,
      } as DiaryItem)
  );

  yield put(initialDiary(diary));
}

//----------------------fetchPagingData---------------------//
function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  const result: AxiosResponse<DiaryPagingResponse> = yield call(
    api.fetchPaging,
    page,
    size
  );

  const diaryPage: DiaryPage = {

    data: result.data.content.map(
      (item) =>
        ({
      id: item.id,
      memberName: item.memberName,
      diaryMorning: item.diaryMorning,
      diaryLunch: item.diaryLunch,
      diaryDinner: item.diaryDinner,
      diaryRoutine: item.diaryRoutine,
      diaryRequest: item.diaryRequest,
      trainerName: item.trainerName,
      trainerFeedback: item.trainerFeedback,
      diaryCreateTime: item.diaryCreateTime,
        } as DiaryItem)
    ),
    totalElements: result.data.totalElements,
    totalPages: result.data.totalPages,
    page: result.data.number,
    pageSize: result.data.size,
    isLast: result.data.last,
  };

  yield put(initialPagedDiary(diaryPage));
}

//----------------------removeData---------------------//
function* removeData(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  const id = action.payload;

  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  if (result.data) {
    yield put(removeDiary(id));
  }

  yield put(initialCompleted());
}

//----------------------modifyData---------------------//
function* modifyData(action: PayloadAction<DiaryItem>) {
  yield console.log("--modifyData--");

  const diaryItemPayload = action.payload;

  const diaryItemRequest: DiaryItemRequest = {
  memberName: diaryItemPayload.memberName,
  diaryMorning: diaryItemPayload.diaryMorning,
  diaryLunch: diaryItemPayload.diaryLunch,
  diaryDinner: diaryItemPayload.diaryDinner,
  diaryRoutine: diaryItemPayload.diaryRoutine,
  diaryRequest: diaryItemPayload.diaryRequest,
  trainerName: diaryItemPayload.trainerName,
  trainerFeedback: diaryItemPayload.trainerFeedback,
  diaryCreateTime: diaryItemPayload.diaryCreateTime, //1119 추가

  };

  const result: AxiosResponse<DiaryItemResponse> = yield call(
    api.modify,
    diaryItemPayload.id,
    diaryItemRequest
  );

  const diaryItem: DiaryItem = {
    id: result.data.id,
      memberName: result.data.memberName,
      diaryMorning: result.data.diaryMorning,
      diaryLunch: result.data.diaryLunch,
      diaryDinner: result.data.diaryDinner,
      diaryRoutine: result.data.diaryRoutine,
      diaryRequest: result.data.diaryRequest,
      trainerName: result.data.trainerName,
      trainerFeedback: result.data.trainerFeedback,
      diaryCreateTime: result.data.diaryCreateTime,
  };

  yield put(modifyDiary(diaryItem));

  yield put(initialCompleted());
}

/* ========= saga action을 감지(take)하는 부분 =============== */

export default function* diarySaga() {

  yield takeEvery(requestAddDiary, addData);
  yield takeLatest(requestFetchDiary, fetchData);
  yield takeLatest(requestFetchPagingDiary, fetchPagingData);
  yield takeEvery(requestRemoveDiary, removeData);
  yield takeEvery(requestModifyDiary, modifyData);
}




