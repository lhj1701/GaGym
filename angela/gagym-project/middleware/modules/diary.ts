import diaryReducer, {
  addDiary,
  initialCompleted,
  initialPagedDiary,
  initialDiary,
  modifyDiary,
  DiaryPage,
  removeDiary,
} from "../../provider/modules/diary";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { DiaryItem } from "../../provider/modules/diary";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { DiaryItemRequest, DiaryItemResponse, DiaryPagingResponse,} from "../../api/diary";
import { AxiosResponse } from "axios";
import {
  endProgress,
  startProgress,
} from "../../provider/modules/progress";
import { addAlert } from "../../provider/modules/alert";
/* photo에는 있네?
import { RootState } from "../../provider";
import { dataUrlToFile } from "../../lib/string";
import fileApi from "../../api/file";
*/

/* ========= saga action Payload 타입 =============== */
export interface PageRequest {
  page: number;
  size: number;
}

/* ========= saga action을 생성하는 부분 =============== */

// diary를 추가하도록 요청하는 action
// {type:string, payload:DiaryItem}
// {type:"diary/requestAddDiary", payload: {title, diaryUrl...}}

// diary를 추가하도록 요청하는 action creator를 생성
// const actionCreator = createAction<Payload타입>(Action.type문자열)
export const requestAddDiary = createAction<DiaryItem>(
  `${diaryReducer.name}/requestAddDiary`
);

// diary를 가져오는 action
export const requestFetchDiarys = createAction(
  `${diaryReducer.name}/requestFetchDiarys`
);

// diary를 페이징으로 가져오는 action
export const requestFetchPagingDiarys = createAction<PageRequest>(
  `${diaryReducer.name}/requestFetchPagingDiarys`
);

// diary를 삭제하는 action
export const requestRemoveDiary = createAction<number>(
  `${diaryReducer.name}/requestRemoveDiary`
);

// diary를 수정하는 action
export const requestModifyDiary = createAction<DiaryItem>(
  `${diaryReducer.name}/requestModifyDiary`
);

/* ========= saga action을 처리하는 부분 =============== */

// 서버에 POST로 데이터를 보내 추가하고, redux state를 변경
function* addData(action: PayloadAction<DiaryItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const diaryItemPayload = action.payload;

    // rest api로 보낼 요청객체
    const diaryItemRequest: DiaryItemRequest = {
  //    id: diaryItemPayload.id,
  memberName: diaryItemPayload.memberName,
  diaryMorning: diaryItemPayload.diaryMorning,
  diaryLunch: diaryItemPayload.diaryLunch,
  diaryDinner: diaryItemPayload.diaryDinner,
  diaryRoutine: diaryItemPayload.diaryRoutine,
  diaryRequest: diaryItemPayload.diaryRequest,
  trainerFeedback: diaryItemPayload.trainerFeedback,

    };

    // ------ 1. rest api에 post로 데이터 보냄
    // call(함수, 매개변수1, 매개변수2...) -> 함수를 호출함
/*
    // spinner 보여주기
    yield put(startProgress());
*/
    // 함수가 Promise를 반환하면, (비동기함수)
    // Saga 미들웨어에서 현재 yield에 대기상태로 있음
    // Promise가 resolve(처리완료)되면 다음 yield로 처리가 진행됨
    // reject(거부/에러)되면 예외를 던짐(throw) -> try ... catch문으로 받을 수 있음.

    // await api.add(diaryItemRequest) 이 구문과 일치함
    // 결과값을 형식을 지졍해야함
    const result: AxiosResponse<DiaryItemResponse> = yield call(
      api.add,
      diaryItemRequest
    );
/*
    // spinner 사라지게 하기
    yield put(endProgress());
*/
    // ------ 2. redux state를 변경함
    // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
 
    const diaryItem: DiaryItem = {
    
/*
      id: result.data.id,
      select: "",
      txtName: "⏳",
      txtContact: "⏳",
      txtEmail: "⏳",
      createdTime: result.data.createdTime,
 */

      id: result.data.id,
      memberName: result.data.memberName,
      diaryMorning: result.data.diaryMorning,
      diaryLunch: result.data.diaryLunch,
      diaryDinner: result.data.diaryDinner,
      diaryRoutine: result.data.diaryRoutine,
      diaryRequest: result.data.diaryRequest,
      trainerFeedback: result.data.trainerFeedback,
      diaryCreateTime: result.data.diaryCreateTime,

    };

    // dispatcher(액션)과 동일함
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put이펙트를 사용함
    yield put(addDiary(diaryItem));

    // completed 속성 삭제
    yield put(initialCompleted());

    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "success", message: "저장중입니다☺" })
    );
  } catch (e: any) {
    // 에러발생
/*
    // spinner 사라지게 하기
    yield put(endProgress());
*/
    // alert박스를 추가해줌
    yield put(
      addAlert({ id: nanoid(), variant: "danger", message: e.message })
    );
  }
}

// Redux 사이드 이펙트
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기
// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
  yield console.log("--fetchData--");
/*
  // spinner 보여주기
  yield put(startProgress());
*/
  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<DiaryItemResponse[]> = yield call(api.fetch);
/*
  // spinner 사라지게 하기
  yield put(endProgress());
*/
  // 응답데이터배열을 액션페이로드배열로 변환
  // DiaryItemResponse[] => DiaryItem[]
  const diarys = result.data.map(
    (item) =>
      ({

      id: item.id,
      memberName: item.memberName,
      diaryMorning: item.diaryMorning,
      diaryLunch: item.diaryLunch,
      diaryDinner: item.diaryDinner,
      diaryRoutine: item.diaryRoutine,
      diaryRequest: item.diaryRequest,
      trainerFeedback: item.trainerFeedback,
      diaryCreateTime: item.diaryCreateTime,


      } as DiaryItem)
  );

  // state 초기화 reducer 실행
  yield put(initialDiary(diarys));
}

function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;
/*
  // spinner 보여주기
  yield put(startProgress());
*/

  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<DiaryPagingResponse> = yield call(
    api.fetchPaging,
    page,
    size
  );
/*
  // spinner 사라지게 하기
  yield put(endProgress());
*/
  // 받아온 페이지 데이터를 Payload 변수로 변환
  const diaryPage: DiaryPage = {
    // 응답데이터배열을 액션페이로드배열로 변환
    // DiaryItemResponse[] => DiaryItem[]
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

  // state 초기화 reducer 실행
  yield put(initialPagedDiary(diaryPage));
}

function* removeData(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  // id값
  const id = action.payload;
/*
  // spinner 보여주기
  yield put(startProgress());
*/
  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);
/*
  // spinner 사라지게 하기
  yield put(endProgress());
*/
  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removeDiary(id));
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

function* modifyData(action: PayloadAction<DiaryItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const diaryItemPayload = action.payload;

  // rest api로 보낼 요청객체
  const diaryItemRequest: DiaryItemRequest = {
  memberName: diaryItemPayload.memberName,
  diaryMorning: diaryItemPayload.diaryMorning,
  diaryLunch: diaryItemPayload.diaryLunch,
  diaryDinner: diaryItemPayload.diaryDinner,
  diaryRoutine: diaryItemPayload.diaryRoutine,
  diaryRequest: diaryItemPayload.diaryRequest,
  trainerFeedback: diaryItemPayload.trainerFeedback,

  };
/*
  // spinner 보여주기
  yield put(startProgress());
*/
  const result: AxiosResponse<DiaryItemResponse> = yield call(
    api.modify,
    diaryItemPayload.id,
    diaryItemRequest
  );
/*
  // spinner 사라지게 하기
  yield put(endProgress());
*/
  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload 객체를 생성
  const diaryItem: DiaryItem = {
          /*
  
    id: result.data.id,
      select: "",
      txtName: "⏳",
      txtContact: "⏳",
      txtEmail: "⏳",
      createdTime: result.data.createdTime,
*/

    id: result.data.id,
      memberName: result.data.memberName,
      diaryMorning: result.data.diaryMorning,
      diaryLunch: result.data.diaryLunch,
      diaryDinner: result.data.diaryDinner,
      diaryRoutine: result.data.diaryRoutine,
      diaryRequest: result.data.diaryRequest,
      trainerFeedback: result.data.trainerFeedback,
      diaryCreateTime: result.data.diaryCreateTime,
  };

  // state 변경
  yield put(modifyDiary(diaryItem));

  // completed 속성 삭제
  yield put(initialCompleted());
}

/* ========= saga action을 감지(take)하는 부분 =============== */
// diary redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성
export default function* diarySaga() {
  // takeEvery(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션은 모두 처리함
  yield takeEvery(requestAddDiary, addData);

  // takeLatest(처리할액션, 액션을처리할함수)
  // 동일한 타입의 액션중에서 가장 마지막 액션만 처리, 이전 액션은 취소
  yield takeLatest(requestFetchDiarys, fetchData);
  yield takeLatest(requestFetchPagingDiarys, fetchPagingData);

  // 삭제처리
  yield takeEvery(requestRemoveDiary, removeData);

  // 수정처리
  yield takeEvery(requestModifyDiary, modifyData);
}
