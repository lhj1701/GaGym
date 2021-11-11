import { useDispatch, useSelector } from "react-redux";
import { MutableRefObject, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import Layout from "../../../components/layout";
import { ReservationList } from "../../../provider/modules/reservation";
import { requestAddReservation } from "../../../middleware/modules/reservation";
import Image from "next/image";

interface GymInfo {
  id:number,
  gymName: string,
  thumbnailUrl: string,
  gymAddress: string,
  gymTime: string,
  trainerName1: string,
  trainerName2: string,
  trainerName3: string,
  trainerName4: string,
}

interface IndexProp {
  reservation: GymInfo[];
}

const ReservationCreate = ({reservation}:IndexProp) => {
  const reservationData = useSelector((state: RootState) => state.reservation.data);
  const router = useRouter();

  // 추가 완료 여부
  // 1. state 변경감지 및 값 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.reservation.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  
//  function getTrainerName(){
//   const ptInfo = useRef() as MutableRefObject<HTMLInputElement>;
//   for(var i=0; i< ptInfo.length;i++){
//     if(ptInfo[i].checked === true){

//     }
//   }
//  }
  const gymName = useRef() as MutableRefObject<HTMLHeadingElement>;
<<<<<<< HEAD
  const ptName = useRef() as MutableRefObject<HTMLInputElement>;
  const service = useRef() as MutableRefObject<HTMLInputElement>;
  // const service2 = useRef() as MutableRefObject<HTMLInputElement>;
  // const service3 = useRef() as MutableRefObject<HTMLInputElement>;
  const price = useRef() as MutableRefObject<HTMLInputElement>;
=======
  const ptName = useRef() as MutableRefObject<HTMLButtonElement>;
  const service = useRef() as MutableRefObject<HTMLButtonElement>;
  const price = useRef() as MutableRefObject<HTMLButtonElement>;
>>>>>>> bb2a5a52f050993644c4619c10c9d4c27eaf0d78
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
      price: price.current?.value,
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
      <div>{reservation.map((item, index) => (
      <><div className="d-flex justify-content-center" key={`reservation-item-${index}`}>
          <div className="m-5">
            <Image
              src={item.thumbnailUrl}
              alt={item.gymName}
              width={350}
              height={350} />
          </div>
         {/* 희망이용권+희망강사 선택 버튼 */}
          <div className="m-5">
            <div >
              <h3 className="d-flex justify-content-center mt-5 my-3"> 희망 PT 이용권 선택</h3>
              <div className="d-flex justify-content-center my-1">
<<<<<<< HEAD
              <button value="PT 1회권" ref={service} type="button" >
              PT 1회</button>
              <button value="PT 10회권" ref={service} type="button" >
              PT 10회</button>
              <button value="PT 30회권" ref={service} type="button" >
              PT 30회</button>
=======
              <div> <button value="PT 1회권" ref={service} type="button">
              PT 1회</button></div>
              <div><button value="PT 10회권" ref={service} type="button" >
              PT 10회</button></div>
              <div><button value="PT 30회권" ref={service} type="button" >
              PT 30회</button></div>
>>>>>>> bb2a5a52f050993644c4619c10c9d4c27eaf0d78
             </div>
            </div>
            <div >
             <h3 className="d-flex justify-content-center mt-5 my-3"> 희망 강사 선택</h3>
<<<<<<< HEAD
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
              <input type="radio" name="강사정보" value={item.trainerName1} ref={ptName}/>
              {item.trainerName1}
              <input type="radio" name="강사정보" value={item.trainerName2} ref={ptName}/>
              {item.trainerName2}
              <input type="radio" name="강사정보" value={item.trainerName3} ref={ptName}/>
              {item.trainerName3}
              <input type="radio" name="강사정보" value={item.trainerName4} ref={ptName}/>
              {item.trainerName4}
=======
             <div className="d-flex justify-content-center my-1">
               <div>
              <button value={item.trainerName1} type="button"  ref={ptName} >
              {item.trainerName1}
              </button></div>
              <div><button value={item.trainerName2} type="button"  ref={ptName} >
              {item.trainerName2}
              </button></div>
              <div><button value={item.trainerName3} type="button"  ref={ptName} >
              {item.trainerName3}
              </button></div>
              <button type="button"  ref={ptName} >
              {item.trainerName4}
              </button>
>>>>>>> bb2a5a52f050993644c4619c10c9d4c27eaf0d78
             </div>
            </div>
          </div>
        </div>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <h2 className='mb-3'>헬스장명</h2>
          <h6 ref={gymName} className="mx-3" >{item.gymName}</h6>
          <h2 className='my-3'>주소</h2>
          <h6 className="mx-3">{item.gymAddress}</h6>
          <h2 className='my-3'>운영시간</h2>
          <h6 className="mx-3">{item.gymTime}</h6>
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
          </>
          ))}
        </div>
      </div>
  </Layout>
  </div>
  );
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // const res = await axios.get<GymInfo[]>("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1");
  // const reservation = res.data;


  // const addreserve: ReservationItem = await res.json();
  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  const reservation =[
   {
    id: 1,
    gymName: "강남 화이트짐",
    thumbnailUrl: "/gymimg/1 (1).jpg",
    gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
    gymCoNum: "0504-3172-6899",
    gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
    trainerName1: "김김김",
    trainerPhotoUrl: "",
    trainerIntro: "강사 박00 입니다.",
    trainerSpecial: "근력운동",
    trainerName2: "이이이",
    trainerPhotoUrl2: "",
    trainerIntro2: "강사 박00 입니다.",
    trainerSpecial2: "근력운동",
    trainerName3: "박박박",
    trainerPhotoUrl3: "",
    trainerIntro3: "강사 박00 입니다.",
    trainerSpecial3: "근력운동",
    trainerName4: "최최최",
    trainerPhotoUrl4: "",
    trainerIntro4: "강사 박00 입니다.",
    trainerSpecial4: "근력운동",
    // gymPrice : gymPrice[],
    gymPhotoUrl: "/gymimg/1 (1).jpg",
    // gymService : gymserviceList[],
    gymNotice: "공지사항 입니다.",
    //--임시
    gym1DayPrice: "10,000원",
    gym3DayPrice: "10,000원",
    gym7DayPrice: "10,000원",
    gymMonthPrice: "10,000원",
    gym3MonthPrice: "10,000원",
    gym6MonthPrice: "10,000원",
    gymYearPrice: "10,000원",

    pt1TimePrice: "10,000원",
    pt10TimePrice: "10,000원",
    pt30TimePrice: "10,000원",
    pilates1TimePrice: "10,000원",
    pilates10TimePrice: "10,000원",
    pilates30TimePrice: "10,000원",
    yoga1TimePrice: "10,000원",
    yoga10TimePrice: "10,000원",
    yoga30TimePrice: "10,000원",
  }
  ]


  return { props: { reservation } };
}


export default ReservationCreate;