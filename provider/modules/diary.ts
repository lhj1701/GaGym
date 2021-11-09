import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DiaryItem {
  id: number;
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime : number;
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
  isAddCompleted?: boolean;
  isRemoveCompleted?: boolean; 
  isModifyCompleted?: boolean;
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
      state.isAddCompleted = true; 
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeDiary: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true;
    },
    modifyDiary: (state, action: PayloadAction<DiaryItem>) => {
      const modifyItem = action.payload;
      const diaryItem = state.data.find((item) => item.id === modifyItem.id);
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

    initialDiary: (state, action: PayloadAction<DiaryItem[]>) => {
      const diarys = action.payload;
      state.data = diarys;
      state.isFetched = true;
    },
    initialPagedDiary: (state, action: PayloadAction<DiaryPage>) => {

      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
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