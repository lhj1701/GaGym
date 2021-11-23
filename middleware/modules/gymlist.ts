import gymlistReducer, {
  initialCompleted,
  initialPagedGymlist,
  initialGymlist,
  initialGymlistItem,
  GymlistPage,
  GymlistItem
} from "../../provider/modules/gymlist";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { GymlistItemRequest, GymlistItemResponse, GymlistPagingResponse,} from "../../api/gymlist";
import { AxiosResponse } from "axios";

import { addAlert } from "../../provider/modules/alert";


/* ========= saga action Payload 타입 =============== */
export interface PageRequest {
  page: number;
  size: number;
}

/* ========= saga action을 생성하는 부분 =============== */

export const requestAddGymlist = createAction<GymlistItem>(
  `${gymlistReducer.name}/requestAddGymlist`
);

// // 더보기 페이징에서 추가할 때
export const requestAddGymlistNext = createAction<GymlistItem>(
  `${gymlistReducer.name}/requestAddGymlistNext`
);

export const requestFetchGymlist = createAction(
  `${gymlistReducer.name}/requestFetchGymlist`
);

export const requestFetchPagingGymlist = createAction<PageRequest>(
  `${gymlistReducer.name}/requestFetchPagingGymlist`
);

// // 다음 페이지 gymlist을 가져오는 action
export const requestFetchNextGymlist = createAction<PageRequest>(
  `${gymlistReducer.name}/requestFetchNextGymlist`
);

// // 1건의 gymlist을 가져오는 action
export const requestFetchGymlistItem = createAction<number>(
  `${gymlistReducer.name}/requestFetchGymlistItem`
);

export const requestRemoveGymlist = createAction<number>(
  `${gymlistReducer.name}/requestRemoveGymlist`
);

export const requestModifyGymlist = createAction<GymlistItem>(
  `${gymlistReducer.name}/requestModifyGymlist`
);

/* ========= saga action을 처리하는 부분 =============== */


//----------------------fetchData---------------------//
function* fetchData() {
  yield console.log("--fetchData--");
  const result: AxiosResponse<GymlistItemResponse[]> = yield call(api.fetch);
  const gymlist = result.data.map(
    (item) =>
      ({
      id: item.id,
      gymCoNum: item.gymCoNum,
      gymAddress: item.gymAddress,
      gymPhoto: item.gymPhoto,
      } as GymlistItem)
  );

  yield put(initialGymlist(gymlist));
}


//----------------------fetchPagingData---------------------//
function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<GymlistPagingResponse> = yield call(
    api.fetchPaging,
    page,
    size
  );

  const gymlistPage: GymlistPage = {
    data: result.data.content.map(
      (item) =>
        ({
      id: item.id,
      gymCoNum: item.gymCoNum,
      gymAddress: item.gymAddress,
      gymPhoto: item.gymPhoto,
      } as GymlistItem)
    ),
    totalElements: result.data.totalElements,
    totalPages: result.data.totalPages,
    page: result.data.number,
    pageSize: result.data.size,
    isLast: result.data.last,
  };

  yield put(initialPagedGymlist(gymlistPage));
}



/* ========= saga action을 감지(take)하는 부분 =============== */

export default function* gymlistSaga() {

  yield takeLatest(requestFetchGymlist, fetchData);
  yield takeLatest(requestFetchPagingGymlist, fetchPagingData);
}
