import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GymlistItem {
  id: number;
  gymName: string;
  gymCoNum: string;
  gymAddress: string;
  gymPhoto: string;
  isEdit?: boolean;
}

export interface GymlistPage {
  data: GymlistItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface GymlistState {
  data: GymlistItem[];
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



const initialState: GymlistState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 5,
  totalPages: 0,
};

const gymlistSlice = createSlice({
  name: "gymlist",
  initialState,
  reducers: {

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
   initialGymlistItem: (state, action: PayloadAction<GymlistItem>) => {
      const gymlist = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = [{ ... gymlist }];
    },
    initialGymlist: (state, action: PayloadAction<GymlistItem[]>) => {
      const gymlist = action.payload;
      state.data = gymlist;
      state.isFetched = true;
    },
        addTotalpages: (state) => {
      state.totalPages++;
    },
    initialPagedGymlist: (state, action: PayloadAction<GymlistPage>) => {

      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
        initialNextGymlist: (state, action: PayloadAction<GymlistPage>) => {

      state.data = state.data.concat(action.payload.data);
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

  initialGymlistItem,
  initialGymlist,
  initialCompleted,
  initialPagedGymlist,
  initialNextGymlist,
} = gymlistSlice.actions;


export default gymlistSlice.reducer;