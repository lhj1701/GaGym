import axios from "axios";
//GymlistItemRequest, GymlistItemResponse, GymlistPagingResponse,

export interface GymlistPagingResponse {
  content: GymlistItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface GymlistItemResponse {
id: number;
gymName:string;
gymCoNum : string;
gymLocateSi : string;
gymLocateGunGu : string;
gymAddress : string;
gymPhoneNum : string;
gymTime : string;
gymService :string;
gymPhoto?:string;
fileName:string;
fileType:string;
gym1DayPrice : string;
gym3DayPrice : string;
gym7DayPrice : string;
gymMonthPrice : string;
gym3MonthPrice : string;
gym6MonthPrice : string;
gymYearPrice : string;

}
export interface GymlistItemRequest {
gymName:string;
gymCoNum : string;
gymLocateSi : string;
gymLocateGunGu : string;
gymAddress : string;
gymPhoneNum : string;
gymTime : string;
gymService :string;
gymPhoto?:string;
fileName:string;
fileType:string;
gym1DayPrice : string;
gym3DayPrice : string;
gym7DayPrice : string;
gymMonthPrice : string;
gym3MonthPrice : string;
gym6MonthPrice : string;
gymYearPrice : string;
}

const gymlistApi = {
  fetch: () =>
  axios.get<GymlistItemResponse[]>(`http://localhost:8080/gym`),

  fetchPaging: (page: number, size: number) =>
    axios.get<GymlistPagingResponse>(
      `http://localhost:8080/gym/paging?page=${page}&size=${size}`
    ),
};

export default gymlistApi;