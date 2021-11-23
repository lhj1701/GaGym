import axios from "axios";

export interface GymInfoResponse {
id: number;
gymName:string;
gymCoNum : string;
gymAddress : string;
gymTime : string;
gymService :string;
gymPhoto:string;
}
export interface GymInfoRequest {
gymName:string;
gymCoNum:string;
gymAddress : string;
gymTime : string;
gymPhoto:string;
}

// export interface TrainerInfoResponse {
// id: number;
// gymCode : string;
// trainerName : string;
// }

// export interface TrainerInfoRequest {
// gymCode : string;
// trainerName : string;
// }
  


const gymInfoApi = {
  get: (id: number) =>
    axios.get<GymInfoResponse[]>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo/${id}`),
  fetch: () =>
  axios.get<GymInfoResponse[]>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo`),

  // getTrainer: (id: number) =>
  // axios.get<TrainerInfoResponse[]>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/trainerinfo/${id}`),
  // fetchTrainer: () =>
  // axios.get<TrainerInfoResponse[]>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/trainerinfo`),


  // add: (gymItem: GymInfoRequest) =>
  //   axios.post<GymInfoResponse>(
  //     `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo`,
  //     gymItem
  //   ),

  // remove: (id: number) =>
  //   axios.delete<boolean>(`http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo/${id}`),


  // modify: (id: number, gymItem: GymInfoRequest) =>
  //   axios.put<GymInfoResponse>(
  //     `http://ec2-52-79-254-140.ap-northeast-2.compute.amazonaws.com:8080/gyminfo/${id}`,
  //     gymItem
  //   )
};

export default gymInfoApi;