import axios from "axios";

// 서버로 부터 받아오는 데이터 1건에 대한 타입
export interface ReservationItemResponse {
  reservationNumber : number
  memberName : string
  // memberPhoneNumStart : number
  // memberPhoneNumMiddle : number
  // memberPhoneNumEnd : number
  memberPhone : string
  memberRequest : string
}

export interface ReservationItemRequest {
  memberName : string
  memberPhone : string
  // memberPhoneNumStart : number
  // memberPhoneNumMiddle : number
  // memberPhoneNumEnd : number
  memberRequest : string
}

export interface ReservationPagingReponse {
  content: ReservationItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const reservationApi = {
  get: (reservationNumber: number) =>
    axios.get<ReservationItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/mypage/myreservation/detail${reservationNumber}`
    ),
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
    axios.get<ReservationItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/mypage/myreservation`
    ),

  fetchPaging: (page: number, size: number) =>
    axios.get<ReservationPagingReponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/reservtaion/paging?page=${page}&size=${size}`
    ),

  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (reservationItem: ReservationItemRequest) =>
    axios.post<ReservationItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/addreservation`,
      reservationItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (reservationNumber: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/mypage/myreservation/detail/${reservationNumber}`),

  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (reservationNumber: number, reservationItem: ReservationItemRequest) =>
    axios.put<ReservationItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/mypage/myreservation/edit/${reservationNumber}`,
      reservationItem
    ),
};

export default reservationApi;