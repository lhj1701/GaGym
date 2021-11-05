import { useDispatch, useSelector } from "react-redux";
import { MutableRefObject, useRef } from "react";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../provider";
import Layout from "../../components/layout";
import styles from "./addreservation.module.css"
import { ReservationItem } from "../../provider/modules/reservation";

const AddReservation = () => {
  const reservation = useSelector((state: RootState) => state.reservation);
  const router = useRouter(); // 컴포넌트 이동을 코드로 제어할 수 있음

  const dispatch = useDispatch<AppDispatch>();

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const tel = useRef() as MutableRefObject<HTMLInputElement>;
  const request = useRef() as MutableRefObject<HTMLTextAreaElement>;
return (
  <Layout>
    <div style={{ width: "80vw" }} className="mx-auto">
      <div className={styles.healthImage}>
      <div className='d-flex justify-content-center'>
     <img src="/ptpengsoo.jpg"
    //  이미지 크기에 맞게 가운데 부분 노출
    //  layout="responsive"
    //  objectFit="cover"
    width={400} height={400}
     //----------------------------------
     alt='sample'/></div>
     <div className={styles.healthInfo}>
       <h2 className='m-3'>헬스장명</h2>
     <h6 className= "mx-5">케어짐</h6>
     <h2 className='m-3'>주소</h2>
     <h6 className= "mx-5">경기도 용인시 수지구 상현로0 지하 1층</h6>
     <h2 className='m-3'>운영시간</h2>
     <h6 className= "mx-5">오전 10시~오후 11시<br/>
          일요일 휴무<br/>
          공휴일 정상운영
      </h6>
      </div>
      </div>
      <div style={{ width: "60vw" }} className="mx-auto">
        <div className={styles.healthPrice}>
          <h2>이용권</h2>
          <button>1회</button>
          <button>10회</button>
          <button className='my-5 '>30회</button><br />
        </div>
        <div className={styles.healthPrice}>
          <h2>강사 정보</h2>
          <button>1회</button>
          <button>10회</button>
          <button className='my-5 '>30회</button><br />
        </div>
        <div className={styles.memberInfo}>
  <form>
    <table className={styles.memberInfo}>
      <thead><h2 className="text-center">예약자 정보 입력</h2></thead>
      <tbody className={styles.memberInfo}>
        <tr><th>예약자명</th><td><input className="form-control" type="text" placeholder="상담 예약자 이름" ref={name}/></td></tr>
        <tr><th>예약자 연락처</th><td>
            <input className="form-control" type="text" placeholder="ex) 010-1234-5678" ref={tel}/>
          </td></tr>
        <tr><th>예약 문의사항</th><td><textarea className="form-control" placeholder="상담 예약자 문의사항" ref={request}/></td></tr>
      </tbody></table></form>
      <button type="button"
          className="my-5 btn btn-primary float-end"
          onClick={() => {
            router.push("../mypage/myreservation");
          }}>예약등록</button></div>
     </div>
  </div>
  </Layout>
  
)
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");

  const addreserve: ReservationItem = await res.json();

  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  return { props: { addreserve } };
}

export default AddReservation;