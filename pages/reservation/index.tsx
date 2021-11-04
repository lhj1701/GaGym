import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../provider";
import Layout from "../../components/layout";
import Image from "next/image"
import styles from "./reservation.module.css"

import {useHistory} from "react-router-dom";
interface memberItem {
  reservationNumber : number
  memberName : string
  memberPhoneNumStart : number
  memberPhoneNumMiddle : number
  memberPhoneNumEnd : number
  memberRequest : string
}

interface gymItem{
  gymName : string
  gymCoNum : number
  gymPrice : gymPrice[]
  gymLocate : string
  gymAddress : string
  gymPhoneNum : number
  gymTime : string
  gymNotice : string
  gymPhotoUrl : string
  gymService : gymServiceList[]
  gymPT : gymPtItem[]
  gymTrainerName : string
  gymTrainerPhotoUrl : string
  gymTrainerIntro : string
  gymTrainerSpecial : string
}

interface gymPrice{
  gymPtPrice1T : number
  gymPtPrice10T : number
  gymPtPrice30T : number
  gymWeightPrice1M : number
  gymWeightPrice3M : number
  gymWeightPrice6M : number
  gymWeightPrice12M : number
  gymYogaPrice1M : number
  gymYogaPrice3M : number
  gymYogaPrice6M : number
  gymYogaPrice12M : number
  gymPilatesPrice1M : number
  gymPilatesPrice3M : number
  gymPilatesPrice6M : number
  gymPilatesPrice12M : number
}

interface gymServiceList{
  PT:boolean
  Weight: boolean
  Yoga : boolean
  Pilates: boolean
}

interface gymPtItem{
  gymPtName : string
  gymPtPhotoURL : string
  gymPtPrice1Time : number
  gymPtPrice10Time : number
  gymPtPrice30Time: number
  gymPtTimeHour: number
}

const Reservation = () => {
  const history = useHistory(); // 컴포넌트 이동을 코드로 제어할 수 있음
return (
  <Layout>
    <div style={{ width: "60vw" }} className="mx-auto">
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
    <h2 className="text-center">예약자 정보 입력</h2>
  <form>
      <table className={styles.memberInfo}>
    <tbody className={styles.memberInfo}>
      <tr><th>예약자명</th><td><input className="form-control" type="text" placeholder="상담 예약자 이름"/></td></tr>
      <tr>
        <th>예약자 연락처</th>
          <td>
            {/* <div className="mx-3"> 연락처 세 토막
             <input type="text" placeholder="ex) 010"/>
            <input className="mx-1"  type="text" placeholder="ex) 1234"/>
            <input className="mx-1" type="text" placeholder="ex) 5678"/></td></tr></div>*/}
            <input className="form-control" type="text" placeholder="ex) 010-1234-5678"/>
          </td>
        </tr>
      <tr><th>예약 문의사항</th><td><textarea
                  className="form-control" placeholder="상담 예약자 문의사항"/></td></tr>
      </tbody></table></form>
      <button type="button"
          className="my-5 btn btn-primary float-end">예약등록</button></div>
          {/* onClick={() => {history.push("/mypage/reservation");}} */}
     </div>
  </div>
  </Layout>
  
)
};

export default Reservation;