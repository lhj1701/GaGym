import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../../provider";
import {
  requestFetchReservationItem,
  requestRemoveReservationNext,
  // requestRemoveReservationPaging,
} from "../../../../middleware/modules/reservation";
import { ReservationItem } from "../../../../provider/modules/reservation";
import Layout from "../../../../components/layout";

import styles from "./mypagereservationdetail.module.css"
const ReservationDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // /mypage/reservation/detail/[id]
  const id = router.query.id as string;
  console.log(id);

  let reservationItem = useSelector((state: RootState) =>
    state.reservation.data.find((item) => item.reservationNumber === +id)
  );

  if (id) {
    // redux에 데이터가 없으면
    if (!reservationItem) {
      // 1건에 데이터를 가져와 store에 추가함
      dispatch(requestFetchReservationItem(+id));
    }
  }

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.reservation.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/mypage/mypage/reservation");
  }, [isRemoveCompleted, router]);

  const handDeleteClick = () => {
    // saga action으로 대체
    // dispatch(requestRemovePhoto(+id)); // 전체 조회일 때
    // dispatch(requestRemovePhotoPaging(+id)); // 숫자 페이징일 때
    dispatch(requestRemoveReservationNext(+id)); // 더보기 페이징일 때

    // dispatch(removePhoto(+id)); // id값만 넣어서 삭제
    // history.push("/photos"); // 목록화면으로 이동
  };
  return(
    <Layout>
 <div className={styles.ReservationDetail}>
 <div className="my-5 d-flex justify-content-center">
    <h2>예약 상세</h2></div>
    <div className="my-5 d-flex justify-content-center">
    <table>
    <tbody>
    <tr><th>예약번호</th><td>{reservationItem?.reservationNumber}</td></tr>
    <tr><th>헬스장명</th><td></td></tr>
    <tr><th>강사</th><td ></td></tr>
    <tr><th>이용권</th><td ></td></tr>
    <tr><th>이용가격</th><td></td></tr>
    <tr><th>예약자 명</th><td>{reservationItem?.memberName}</td></tr>
    <tr><th>예약자 연락처</th><td>{reservationItem?.memberPhone}</td></tr>
    <tr><th>문의사항</th><td>{reservationItem?.memberRequest}</td></tr>
    </tbody>
    </table>
    </div>
    <div className="d-flex justify-content-center">
      <button className="btn btn-primary float-end mx-1"
      onClick={() => {
        router.push("/mypage/myreservation/edit/[reservationNumber]");
      }}>수정</button>
      <button className="btn btn-primary float-end" >예약취소</button></div>
    </div>
    </Layout>
  )
}
export default ReservationDetail;