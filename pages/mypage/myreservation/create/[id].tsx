import { useDispatch, useSelector } from "react-redux";
import React, { MutableRefObject, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import Layout from "../../../../components/layout";
import AppBar from "../../../../components/appbar";
import { ReservationList } from "../../../../provider/modules/reservation";
import { requestAddReservation } from "../../../../middleware/modules/reservation";
import Image from "next/image";
import { GetServerSideProps } from "next";
import axios from "axios";
import styles from "../../../../styles/mypage.module.css";

interface GymInfo {
  id: number;
  gymName: string;
  gymAddress: string;
  gymCoNum : string;
  gymTime: string;
  gymPhoto: string;
  // trainerInfo: TrainerInfo[]
}

interface Trainers {
  id: number;
  gymCode:string;
  trainerName: string;
}

interface IndexProp {
  gymInfo: GymInfo;
  trainers: Trainers[];
}

const ReservationCreate = ({gymInfo, trainers}:IndexProp) => {
  const reservationData = useSelector((state: RootState) => state.reservation.data);
  const router = useRouter();
  const id = router.query.id as string;
  

  // 추가 완료 여부
  // 1. state 변경감지 및 값 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.reservation.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const gymName = useRef() as MutableRefObject<HTMLHeadingElement>;
  const ptName = useRef() as MutableRefObject<HTMLSelectElement>;
  const service = useRef() as MutableRefObject<HTMLSelectElement>;
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const tel = useRef() as MutableRefObject<HTMLInputElement>;
  const request = useRef() as MutableRefObject<HTMLTextAreaElement>;
  

  // isAddCompleted값이 변경되면 처리(처음 렌더링되는 시점에도 처리됨)
  // 2. state가 변경되면 처리되는 함수
  useEffect(() => {
    isAddCompleted && router.push("/mypage/mypage");
  }, [isAddCompleted, router, dispatch]);

  function handleSaveClick(): void {
    // 추가할 객체 생성
    const reservation: ReservationList = {
      // 기존데이터의 id 중에서 가장 큰 것 + 1
      id: reservationData.length ? reservationData[0].id + 1 : 1,
      gymName: gymName.current?.innerText,
      trainerName: ptName.current.value,
      boughtService: service.current.value,
      // 입력 정보
      memberName: name.current?.value,
      memberPhone: tel.current?.value,
      memberRequest: request.current?.value
    };

    dispatch(requestAddReservation(reservation)); // 전체조회

    // dispatch(requestAddReservationNext(item)); // 더보기페이징
    router.push("/mypage/mypage");
  }

  // const trainer = useSelector((state:RootState)=>state.trainer.data.find(item)=>item.gymCode == gymInfo.gymCoNum);

return (
<div >
  <Layout>
  {/* <AppBar/> */}
    <div style={{ width: "60vw" }} className="mx-auto">
    {/* <div className="d-flex justify-content-center float-end">
      <h2>예약화면</h2></div> */}
      <div>
      <div className="d-flex justify-content-center" key={gymInfo.id}>
          <div style={{ width: "30vw" }} className="my-4">
            <Image
              src={"/gymimg/1 (1).jpg"}
              alt={gymInfo.gymName}
              width={300}
              height={300} />
          </div>
         {/* 희망이용권+희망강사 선택 버튼 */}
          <div className="d-flex justify-content-center mt-5 ms-3" style={{ width: "30vh", height: "300px" }}>
            <div className="ms-3">
              <h4 className="d-flex justify-content-center mt-5 my-3">PT 이용권</h4>
              <div className="d-flex justify-content-center my-1">
              <select ref={service}>
                <option defaultValue="PT 1회권"> PT 1회권</option>
                <option defaultValue="PT 10회권"> PT 10회권</option>
                <option defaultValue="PT 30회권"> PT 30회권</option>
              </select>
             </div>
            </div>
            <div className="ms-3">
             <h4 className="d-flex justify-content-center mt-5 my-3">강사</h4>
            <div className="d-flex justify-content-center my-1">
              <select name="강사정보" ref={ptName}>
               {trainers.map((item, index) => ( 
              <option defaultValue={item.trainerName} key={`reservation-item-${index}`}>{item.trainerName}</option>))}
              </select>
             </div>
            </div>
          </div>
        </div>
      <div > 
      <div className="d-flex justify-content-center">
        <div style={{ width: "30vw" }} className="ms-3">
          <h4 className='mb-3'>헬스장명</h4>
          <h6 ref={gymName} className="mx-3" >{gymInfo.gymName}</h6>
          <h4 className='my-3'>주소</h4>
          <h6 className="mx-3">{gymInfo.gymAddress}</h6>
          <h4 className='my-3'>운영시간</h4>
          <h6 className="mx-3">{gymInfo.gymTime}</h6>
        </div>
        <div className="ms-3 "style={{width:"35vh"}}>
          <h4 className="d-flex justify-content-center text-center mx-2 ">예약자 정보 입력</h4>
          <table >
            <tbody>
              <tr><th className="me-5">이름</th><td ><input className="form-control" type="text" placeholder="상담 예약자 이름"ref={name}/></td></tr>
              <tr><th className="me-5">연락처</th><td><input className="form-control" type="text" placeholder="ex) 010-1234-5678" ref={tel} /></td></tr>
              <tr><th className="me-5" style={{width:"60px"}}>문의사항</th><td><textarea className="form-control" placeholder="상담 예약자 문의사항" ref={request}/></td></tr>
              <tr><th></th><td className="float-end"><button
                                      className={styles.detailbtn}
                                      onClick={() => {handleSaveClick ();}}
                                      type="button">예약등록</button></td></tr>
            </tbody>
          </table>
          {/* <button
            className={styles.detailbtn}
            onClick={() => {handleSaveClick ();}}
            type="button">예약등록</button> */}
        </div>
      </div>
      </div>
        </div>
      </div>
  </Layout>
  </div>
  );
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  
// export async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await axios.get<GymInfo[]>
  (`http://localhost:8080/gyminfo`);
  // (`http://localhost:8080/gyminfo/${id}`);

  // const gymInfo = gymInfos.find((item) => item.id === +id);
  const gymInfo = res.data.find((item) => item.id === +id);

  const trainer = await axios.get<Trainers[]>(
    `http://localhost:8080/trainer`
  );

  const trainers = trainer.data.filter(
    (item) => item.gymCode == gymInfo.gymCoNum
  );

  // const addreserve: ReservationItem = await res.json();
  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  // const gymInfos = [
  //   {
  //     albumId: 1,
  //     id: 1,
  //     gymName: "강남 화이트짐",
  //     gymPhoto: "/gymimg/1 (1).jpg",
  //     gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime:
  //       "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "/trainer/trainer (1).jpg",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 2,
  //     gymName: "논현 REGENT 프라이빗짐",
  //     gymPhoto: "/gymimg/2 (1).jpg",
  //     gymAddress:
  //       "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 3,
  //     gymName: "대치 로그짐",
  //     gymPhoto: "/gymimg/3 (1).jpg",
  //     gymAddress: "서울특별시 강남구 삼성로 317, 우석빌딩 지하2 로그짐 대치점",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 4,
  //     gymName: "대치 휘트니스G",
  //     gymPhoto: "/gymimg/4 (1).jpg",
  //     gymAddress: "서울 강남구 역삼로 542 신사에스엔지 지하 1층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 5,
  //     gymName: "선릉 바디스페이스",
  //     gymPhoto: "/gymimg/5 (1).jpg",
  //     gymAddress: "서울특별시 강남구 테헤란로 311 지하1층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 6,
  //     gymName: "선릉 보리스짐",
  //     gymPhoto: "/gymimg/6 (1).jpg",
  //     gymAddress: "서울특별시 강남구 선릉로94길 7 현죽빌딩 지하 1층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 7,
  //     gymName: "압구정 로그짐",
  //     gymPhoto: "/gymimg/7 (1).jpg",
  //     gymAddress: "서울특별시 강남구 압구정로28길 40, 5층 로그짐",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 8,
  //     gymName: "언주 아트짐 토탈휘트니스",
  //     gymPhoto: "/gymimg/8 (1).jpg",
  //     gymAddress: "서울특별시 강남구 논현로 626, 엠빌딩 지하2층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 9,
  //     gymName: "역삼 F&G휘트니스",
  //     gymPhoto: "/gymimg/9 (1).jpg",
  //     gymAddress: "서울특별시 강남구 테헤란로25길 7 창성재단빌딩 지하 1, 2층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  //   {
  //     albumId: 1,
  //     id: 10,
  //     gymName: "청담 리발란스K",
  //     gymPhoto: "/gymimg/10 (1).jpg",
  //     gymAddress: "서울특별시 강남구 학동로97길 20 튼튼병원 별관 지하1층",
  //     gymCoNum: "0504-3172-6899",
  //     gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     // gymPrice : gymPrice[],
  //     gymPhotoUrl: "/gymimg/1 (1).jpg",
  //     // gymService : gymserviceList[],
  //   },
  // ];

  return { props: { gymInfo, trainers } };
}


export default ReservationCreate;