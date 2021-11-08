import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import { requestModifyReservation } from "../../../../middleware/modules/reservation";
import { ReservationItem } from "../../../../provider/modules/reservation";
import reservationApi, {ReservationItemResponse} from "../../../../api/reservation";

import Layout from "../../../../components/layout";

const ReservationEdit = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const reservationItem = useSelector((state: RootState) =>
    state.reservation.data.find((item) => item.reservationNumber === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.reservation.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const nameEdit = useRef() as MutableRefObject<HTMLInputElement>;
  const telEdit = useRef() as MutableRefObject<HTMLInputElement>;
  const requestEdit = useRef() as MutableRefObject<HTMLTextAreaElement>;


  useEffect(() => {
    isModifyCompleted && router.push(`/mypage/myreservation/detail/[reservationNumber]`);
  }, [isModifyCompleted, router]);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const handleSave = () => {
    if (reservationItem) {
      const item = {...reservationItem};
      item.memberName = nameEdit.current ? nameEdit.current.value : "";
      item.memberPhone = telEdit.current? telEdit.current.value : "";
      // item.memberPhoneNumStart + item.memberPhoneNumMiddle + item.memberPhoneNumEnd = telEdit.current? telEdit.current.value : "";
      // item.memberPhoneNumMiddle = telEdit.current? telEdit.current.value : "";
      // item.memberPhoneNumEnd = telEdit.current? telEdit.current.value : "";
      item.memberRequest = requestEdit.current? requestEdit.current.value : "";

      // reducer로 state 수정 및 목록으로 이동
      saveItem(item);
    }
  };

  const saveItem = (item: ReservationItem) => {
    dispatch(requestModifyReservation(item)); // saga action으로 대체
  };
  return(
    <Layout>
  <div className="my-5">
    <div className="d-flex justify-content-center">
    <h2>예약자 정보 수정</h2></div>
    <div className="my-2 d-flex justify-content-center">
    <form><table>
    <tr><th>예약번호</th><td></td></tr>
    <tr><th>헬스장명</th><td></td></tr>
    <tr><th>강사</th><td ></td></tr>
    <tr><th>이용권</th><td ></td></tr>
    <tr><th>이용가격</th><td></td></tr>
    <tr><th>예약자 명</th><td><input className="form-control" type="text" defaultValue={reservationItem?.memberName} ref={nameEdit}/></td></tr>
    {/* <tr><th>예약자 연락처</th><td><input className="form-control" type="text" defaultValue={reservationItem.memberPhoneNumStart + "-" + reservationItem.memberPhoneNumMiddle + "-" + reservationItem.memberPhoneNumEnd} ref={telEdit} /></td></tr> */}
    <tr><th>예약자 연락처</th><td><input className="form-control" type="text" defaultValue={reservationItem?.memberPhone} ref={telEdit} /></td></tr>
    <tr><th>문의사항</th><td><textarea style={{height:"20vh"}}className="form-control" defaultValue={reservationItem?.memberRequest} ref={requestEdit}/></td></tr>
    </table></form>
    </div>
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary float-end" onClick={() => {
                  router.push(`/mypage/myreservation/detail/[reservationNumber]`);
                }} >목록</button>
                <button
            className="btn btn-primary float-end"
            onClick={() => {handleSave();}}>
            <i className="bi bi-check" />
            저장
          </button>
                </div>
    </div>
    </Layout>
  )
}
export default ReservationEdit;