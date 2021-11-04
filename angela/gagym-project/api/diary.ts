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
  trainerFeedback: string;
  //diaryCreateTime: number;
}

const diaryApi = {
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
  axios.get<DiaryItemResponse[]>(`http://localhost:8080/diarys`),
  //axios.get<DiaryItemResponse[]>(`${process.env.REACT_APP_API_BASE}/diarys`),

  fetchPaging: (page: number, size: number) =>
    axios.get<DiaryPagingResponse>(
      `http://localhost:8080/diarys/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (diaryItem: DiaryItemRequest) =>
    axios.post<DiaryItemResponse>(
//      `${process.env.REACT_APP_API_BASE}/diarys`,
      `http://localhost:8080/diarys`,
      diaryItem
    ),

  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`http://localhost:8080/diarys/${id}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, diaryItem: DiaryItemRequest) =>
    axios.put<DiaryItemResponse>(
      `http://localhost:8080/diarys/${id}`,
      diaryItem
    )
};

export default diaryApi;