import { useDispatch, useSelector } from "react-redux";
import { MutableRefObject, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../provider";
import Layout from "../../components/layout";
import styles from "./addreservation.module.css"
import { ReservationItem } from "../../provider/modules/reservation";
import { requestAddReservation, requestAddReservationNext } from "../../middleware/modules/reservation";
import axios from "axios";
import Image from "next/image";
import reservationApi from "../../api/reservation"

// interface UserInfo {
//   id: number;
//   name: string;
//   username:string
//   email:string;
//   address:string,
//   phone: string;
//   website: string;
//   company: string;
// }

interface GymInfo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IndexProp {
  reservation: GymInfo[];
}

const Index = ({reservation}:IndexProp) => {
  const reservationData = useSelector((state: RootState) => state.reservation.data);
  const router = useRouter(); // 컴포넌트 이동을 코드로 제어할 수 있음

  // 추가 완료 여부
  // 1. state 변경감지 및 값 가져오기
  const isAddCompleted = useSelector(
    (state: RootState) => state.reservation.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const tel = useRef() as MutableRefObject<HTMLInputElement>;
  const request = useRef() as MutableRefObject<HTMLTextAreaElement>;

  // isAddCompleted값이 변경되면 처리(처음 렌더링되는 시점에도 처리됨)
  // 2. state가 변경되면 처리되는 함수
  useEffect(() => {
    isAddCompleted && router.push("/mypage/myreservation");
  }, [isAddCompleted, router, dispatch]);


  const add = () => {
        // 추가할 객체 생성
        const reservation: ReservationItem = {
          // 기존데이터의 id 중에서 가장 큰 것 + 1
          reservationNumber: reservationData.length ? reservationData[0].reservationNumber + 1 : 1,
          // 입력 정보
          memberName: name.current ? name.current.value : "",
          memberPhone: tel.current?.value,
          memberRequest: request.current.value
        };
        
        dispatch(requestAddReservation(reservation)); // 전체조회
        // dispatch(requestAddReservationNext(item)); // 더보기페이징
      };

return (
  <Layout>
    <div style={{ width: "80vw" }} className="mx-auto">
      <div>{reservation.map((item, index) => (
        <><div className='d-flex justify-content-center' key={`reservation-item-${index}`}>
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            width={300}
            height={300} />
          <div className="mx-5">
            <h2 className='m-3'>헬스장명</h2>
            <h6 className="mx-5">{item.id}</h6>
            <h2 className='m-3'>주소</h2>
            <h6 className="mx-5">{item.url}</h6>
            <h2 className='m-3'>운영시간</h2>
            <h6 className="mx-5">{item.title}</h6>
          </div>
        </div>
        <div style={{ width: "40vw" }} className="mx-auto ">
            <h3 className={styles.h3}>강사소개</h3>
            <div className="d-flex align-items-center mt-3">
              <Image
                src={item.thumbnailUrl}
                alt={item.title}
                width={150}
                height={150}
                className={styles.img} />
              <div>
                <p className="d-flex mb-1">
                  <u>강사이름</u>
                </p>
                <p>{item.id}</p>
                <p className="d-flex mb-1">
                  <u>강사 한줄 소개</u>
                </p>
                <p>{item.title}</p>
                <p className="d-flex mb-1">
                  <u>전문분야</u>
                </p>
                <p>{item.url}</p>
              </div>
            </div>
            <h3 className={styles.h3}>이용권</h3>
            {/*P.T*/}
            <div>
              <p className="d-flex justify-content-center mt-3">
                <u>P.T</u>
              </p>
              <div className="d-flex justify-content-center mt-3">
                <button type="button" className={styles.btn}>
                1회
              </button>
              <button type="button" className={styles.btn}>
                10회
              </button>
              <button type="button" className={styles.btn}>
                30회
              </button>
              </div>
            </div>
            {/*헬스*/}
            <div>
              <p className="d-flex justify-content-center mt-5">
                <u>헬스</u>
              </p>
              <div className="d-flex justify-content-center mt-3">
              <button type="button" className={styles.btn}>
                1개월
              </button>
              <button type="button" className={styles.btn}>
                3개월
              </button>
              <button type="button" className={styles.btn}>
                6개월
              </button>
              <button type="button" className={styles.btn}>
                12개월
              </button></div>
            </div>
            {/*필라테스*/}
            <div>
              <p className="d-flex justify-content-center mt-5">
                <u>필라테스</u>
              </p>
              <div className="d-flex justify-content-center mt-5">
              <button type="button" className={styles.btn}>
                1개월
              </button>
              <button type="button" className={styles.btn}>
                3개월
              </button>
              <button type="button" className={styles.btn}>
                6개월
              </button>
              <button type="button" className={styles.btn}>
                12개월
              </button></div>
            </div>
            {/*요가*/}
            <div>
              <p className="d-flex justify-content-center mt-5">
                <u>요가</u>
              </p>
              <div className="d-flex justify-content-center mt-5">
              <button type="button" className={styles.btn}>
                1개월
              </button>
              <button type="button" className={styles.btn}>
                3개월
              </button>
              <button type="button" className={styles.btn}>
                6개월
              </button>
              <button type="button" className={styles.btn}>
                12개월
              </button></div></div>
            <div>
              <form>
                <table>
                  <thead>
                    <h2 className="d-flex justify-content-center text-center mt-5">예약자 정보 입력</h2></thead>
                  <tbody>
                    <tr><th>예약자명</th><td><input className="form-control" type="text" placeholder="상담 예약자 이름" ref={name} /></td></tr>
                    <tr><th>예약자 연락처</th><td>
                      <input className="form-control" type="text" placeholder="ex) 010-1234-5678" ref={tel} />
                    </td></tr>
                    <tr><th>예약 문의사항</th><td><textarea className="form-control" placeholder="상담 예약자 문의사항" ref={request} /></td></tr>
                  </tbody></table></form>
              <button type="button"
                className="my-5 btn btn-primary float-end"
                onClick={() => {
                  add();
                } }>예약등록</button></div>
          </div></>
          ))}
        </div>
      </div>
  </Layout>
  );
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await axios.get<GymInfo[]>("https://jsonplaceholder.typicode.com/photos?_start=0&_limit=1");
  const reservation = res.data;


  // const addreserve: ReservationItem = await res.json();
  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  return { props: { reservation } };
}


export default Index;