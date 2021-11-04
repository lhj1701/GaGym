import Layout from "../../components/layout";

const ReservationEdit = () => {
  return(
    <Layout>
  <div className="my-5">
    <div className="d-flex justify-content-center">
    <h2>예약자 정보 수정</h2></div>
    <div className="my-2 d-flex justify-content-center">
    <table>
    <tr><th>예약번호</th><td>21-041654</td></tr>
    <tr><th>헬스장명</th><td>대치 휘트니스G</td></tr>
    <tr><th>강사</th><td >ㅇㅇㅇ</td></tr>
    <tr><th>이용권</th><td >10회</td></tr>
    <tr><th>이용가격</th><td>400000원</td></tr>
    <tr><th>예약자 명</th><td><input className="form-control" type="text" defaultValue="ㅁㅁㅁ" /></td></tr>
    <tr><th>예약자 연락처</th><td><input className="form-control" type="text" defaultValue="010-1234-5678" /></td></tr>
    <tr><th>문의사항</th><td><input style={{height:"20vh"}}className="form-control" type="text" defaultValue="오늘부터 일지 가능한가요?" /></td></tr>
    </table>
    </div>
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary float-end" >저장</button></div>
    </div>
    </Layout>
  )
}
export default ReservationEdit;