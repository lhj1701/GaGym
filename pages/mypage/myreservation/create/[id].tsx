import { useDispatch, useSelector } from "react-redux";
import { MutableRefObject, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import Layout from "../../../../components/layout";
import { ReservationList } from "../../../../provider/modules/reservation";
import { requestAddReservation } from "../../../../middleware/modules/reservation";
import Image from "next/image";
import { GetServerSideProps } from "next";

interface GymDetail {
  id:number,
  gymName: string,
  thumbnailUrl: string,
  gymAddress: string,
  gymTime: string,
  trainerName: string,
}

interface IndexProp {
  gymDetail: GymDetail;
}

const ReservationCreate = ({gymDetail}:IndexProp) => {
  const reservationData = useSelector((state: RootState) => state.reservation.data);
  const router = useRouter();

  // 추가 완료 여부
  // 1. state 변경감지 및 값 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.reservation.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  // const voucher = document.getElementsByName('희망 이용권');
  // var voucherrChoice; // 여기에 선택된 radio 버튼의 값이 담기게 된다.
  // for(let i=0; i<voucher.length; i++) {
  //   if(voucher[i].checked) {
  //     voucherrChoice = voucher[i].value;
  //   }
  // }
  const gymName = useRef() as MutableRefObject<HTMLHeadingElement>;
  const ptName = useRef() as MutableRefObject<HTMLInputElement>;
  const service = useRef() as MutableRefObject<HTMLInputElement>;
  // const service2 = useRef() as MutableRefObject<HTMLInputElement>;
  // const service3 = useRef() as MutableRefObject<HTMLInputElement>;
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
      boughtService: service.current?.value,
      // 입력 정보
      memberName: name.current?.value,
      memberPhone: tel.current?.value,
      memberRequest: request.current?.value
    };

    dispatch(requestAddReservation(reservation)); // 전체조회

    // dispatch(requestAddReservationNext(item)); // 더보기페이징
    router.push("/mypage/mypage");
  }

return (
<div >
  <Layout>
    <div style={{ width: "80vw" }} className="mx-auto">
      <div>
      <div className="d-flex justify-content-center" key={gymDetail.id}>
          <div className="m-5">
            <Image
              src={gymDetail.thumbnailUrl}
              alt={gymDetail.gymName}
              width={300}
              height={300} />
          </div>
         {/* 희망이용권+희망강사 선택 버튼 */}
          <div className="m-5">
            <div >
              <h3 className="d-flex justify-content-center mt-5 my-3"> 희망 PT 이용권 선택</h3>
              <div className="d-flex justify-content-center my-1">
              <label><input value="PT 1회권" name="희망 이용권" type="radio"  ref={service}/>PT 1회권</label>
              <label><input value="PT 10회권" name="희망 이용권"  type="radio" ref={service}/>PT 10회권</label>
              <label><input value="PT 30회권" name="희망 이용권"  type="radio" ref={service}/>PT 30회권</label>
             </div>
            </div>
            <div >
             <h3 className="d-flex justify-content-center mt-5 my-3"> 희망 강사 선택</h3>
             {/* <div className="d-flex justify-content-center my-1">
              <button type="button"  ref={ptName} >
              {item.trainerName1}
              </button>
              <button type="button"  ref={ptName} >
              {item.trainerName2}
              </button>
              <button type="button"  ref={ptName} >
              {item.trainerName3}
              </button>
              <button type="button"  ref={ptName} >
              {item.trainerName4}
              </button>
             </div> */}
            <div className="d-flex justify-content-center my-1">
              <input type="radio" name="강사정보" value={gymDetail.trainerName} ref={ptName}/>
              {gymDetail.trainerName}
              {/* {gymDetail.trainerName}
              <input type="radio" name="강사정보" value={gymDetail.trainerName2} ref={ptName}/>
              {gymDetail.trainerName2}
              <input type="radio" name="강사정보" value={gymDetail.trainerName3} ref={ptName}/>
              {gymDetail.trainerName3}
              <input type="radio" name="강사정보" value={gymDetail.trainerName4} ref={ptName}/>
              {gymDetail.trainerName4} */}
             </div>
            </div>
          </div>
        </div>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <h2 className='mb-3'>헬스장명</h2>
          <h6 ref={gymName} className="mx-3" >{gymDetail.gymName}</h6>
          <h2 className='my-3'>주소</h2>
          <h6 className="mx-3">{gymDetail.gymAddress}</h6>
          <h2 className='my-3'>운영시간</h2>
          <h6 className="mx-3">{gymDetail.gymTime}</h6>
        </div>
        <div>
          <h2 className="d-flex justify-content-center text-center">예약자 정보 입력</h2>
          <table className="mx-auto ">
            <tbody>
              <tr><th>예약자명</th><td><input className="form-control" type="text" placeholder="상담 예약자 이름"ref={name}/></td></tr>
              <tr><th>예약자 연락처</th><td><input className="form-control" type="text" placeholder="ex) 010-1234-5678" ref={tel} /></td></tr>
              <tr><th>예약 문의사항</th><td><textarea className="form-control" placeholder="상담 예약자 문의사항" ref={request}/></td></tr>
            </tbody>
          </table>
          <button
            className="my-5 btn btn-primary float-end"
            onClick={() => {handleSaveClick ();}}
            type="button">예약등록</button>
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
  // const res = await axios.get<GymInfo[]>("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1");
  // const reservation = res.data;


  // const addreserve: ReservationItem = await res.json();
  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  const gymDetails = [
    {
      albumId: 1,
      id: 1,
      gymName: "강남 화이트짐",
      thumbnailUrl: "/gymimg/1 (1).jpg",
      gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "/trainer/trainer (1).jpg",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 2,
      gymName: "논현 REGENT 프라이빗짐",
      thumbnailUrl: "/gymimg/2 (1).jpg",
      gymAddress:
        "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 3,
      gymName: "대치 로그짐",
      thumbnailUrl: "/gymimg/3 (1).jpg",
      gymAddress: "서울특별시 강남구 삼성로 317, 우석빌딩 지하2 로그짐 대치점",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 4,
      gymName: "대치 휘트니스G",
      thumbnailUrl: "/gymimg/4 (1).jpg",
      gymAddress: "서울 강남구 역삼로 542 신사에스엔지 지하 1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 5,
      gymName: "선릉 바디스페이스",
      thumbnailUrl: "/gymimg/5 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로 311 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 6,
      gymName: "선릉 보리스짐",
      thumbnailUrl: "/gymimg/6 (1).jpg",
      gymAddress: "서울특별시 강남구 선릉로94길 7 현죽빌딩 지하 1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 7,
      gymName: "압구정 로그짐",
      thumbnailUrl: "/gymimg/7 (1).jpg",
      gymAddress: "서울특별시 강남구 압구정로28길 40, 5층 로그짐",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 8,
      gymName: "언주 아트짐 토탈휘트니스",
      thumbnailUrl: "/gymimg/8 (1).jpg",
      gymAddress: "서울특별시 강남구 논현로 626, 엠빌딩 지하2층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 9,
      gymName: "역삼 F&G휘트니스",
      thumbnailUrl: "/gymimg/9 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로25길 7 창성재단빌딩 지하 1, 2층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 10,
      gymName: "청담 리발란스K",
      thumbnailUrl: "/gymimg/10 (1).jpg",
      gymAddress: "서울특별시 강남구 학동로97길 20 튼튼병원 별관 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
  ];

  const gymDetail = gymDetails.find((item) => item.id === +id);

  return { props: { gymDetail } };
}


export default ReservationCreate;