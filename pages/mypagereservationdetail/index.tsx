import Layout from "../../components/layout";
import styles from "./mypagereservationdetail.module.css"
const ReservationDetail = () => {
  return(
    <Layout>
 <div className={styles.ReservationDetail}>
 <div className="my-5 d-flex justify-content-center">
    <h2>예약 상세</h2></div>
    <div className="my-5 d-flex justify-content-center">
    <table>
    <tbody>
    <tr><th>예약번호</th><td>21-041654</td></tr>
    <tr><th>헬스장명</th><td>대치 휘트니스G</td></tr>
    <tr><th>강사</th><td >ㅇㅇㅇ</td></tr>
    <tr><th>이용권</th><td >10회</td></tr>
    <tr><th>이용가격</th><td>400000원</td></tr>
    <tr><th>예약자 명</th><td>"ㅁㅁㅁ"</td></tr>
    <tr><th>예약자 연락처</th><td>010-1234-5678</td></tr>
    <tr><th>문의사항</th><td>오늘부터 일지 가능한가요?"</td></tr>
    </tbody>
    </table>
    </div>
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary float-end mx-1" >수정</button>
      <button className="btn btn-primary float-end" >예약취소</button></div>
    </div>
    </Layout>
  )
}
export default ReservationDetail;