import axios from "axios";

export interface DiaryPagingResponse {
  content: DiaryItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface DiaryItemResponse {
  id: number;
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime: number;

}
export interface DiaryItemRequest {
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime: number;
}

const diaryApi = {
  get: (id: number) =>
    axios.get<DiaryItemResponse[]>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/${id}`),


  add: (diaryItem: DiaryItemRequest) =>
    axios.post<DiaryItemResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary`,
      diaryItem
    ),
  
  fetch: () =>
  axios.get<DiaryItemResponse[]>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary`),

  
  fetchPaging: (page: number, size: number) =>
    axios.get<DiaryPagingResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/paging?page=${page}&size=${size}`
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/${id}`),


  modify: (id: number, diaryItem: DiaryItemRequest) =>
    axios.put<DiaryItemResponse>(
      `http://ec2-3-36-96-181.ap-northeast-2.compute.amazonaws.com:8080/diary/${id}`,
      diaryItem
    )
};

export default diaryApi;