import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DiaryItem {
  id: number;
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerFeedback: string;
  diaryCreateTime: number;
  isEdit?: boolean;
}

export interface DiaryPage {
  data: DiaryItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface diaryState {
  data: DiaryItem[];
  isFetched: boolean;
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const initialState: diaryState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 5,
  totalPages: 0,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    addDiary: (state, action: PayloadAction<DiaryItem>) => {
      const diary = action.payload;
      console.log("--in reducer function--");
      console.log(diary);
      state.data.unshift(diary);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeDiary: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyDiary: (state, action: PayloadAction<DiaryItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const diaryItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (diaryItem) {
        diaryItem.memberName = modifyItem.memberName;
        diaryItem.diaryMorning = modifyItem.diaryMorning;
        diaryItem.diaryLunch = modifyItem.diaryLunch;
        diaryItem.diaryDinner = modifyItem.diaryDinner;
        diaryItem.diaryRoutine = modifyItem.diaryRoutine;
        diaryItem.diaryRequest = modifyItem.diaryRequest;
        diaryItem.trainerFeedback = modifyItem.trainerFeedback;
        diaryItem.diaryCreateTime = modifyItem.diaryCreateTime;

      }
           state.isModifyCompleted = true;
    },

    // payload값으로 state를 초기화하는 reducer 필요함
    initialDiary: (state, action: PayloadAction<DiaryItem[]>) => {
      const diarys = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = diarys;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedDiary: (state, action: PayloadAction<DiaryPage>) => {
      // 백엔드에서 받아온 데이터
      // 컨텐트
      state.data = action.payload.data;
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

export const { 
  addDiary, 
  removeDiary, 
  modifyDiary,  
  initialDiary,
  initialCompleted,
  initialPagedDiary,
} = diarySlice.actions;


export default diarySlice.reducer;