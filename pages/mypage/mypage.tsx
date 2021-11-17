import React, { useEffect } from "react";
import Head from "next/head";

import styles from "../../styles/mypage.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";

import getTimeString from "../../provider/modules/getTimeString";
import {
  requestFetchNextReservation,
  requestFetchPagingReservation,
  requestFetchReservation,
} from "../../middleware/modules/reservation";
import { requestFetchDiary } from "../../middleware/modules/diary";

const Mypage = () => {
  const diary = useSelector((state: RootState) => state.diary);
  const router = useRouter();
  const reservation = useSelector((state: RootState) => state.reservation);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!reservation.isFetched) {
      dispatch(requestFetchReservation());
      if (!diary.isFetched) {
        dispatch(requestFetchDiary());
      }
    }
  }, [dispatch, reservation.isFetched, diary.isFetched]);

  //----------------------11/15임시
  // useEffect(() => {
  //   if (!diary.isFetched) {
  //     dispatch(requestFetchDiary());
  //   }
  // }, [dispatch, diary.isFetched]);

  //----------------------11/15임시끝

  return (
    <div>
      <AppBar />
      <Head>
        <title>GaGym</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.div}>
          <div className="d-flex mt-5">
            <p className={styles.p}>예약내역</p>
          </div>
          <table className="table">
            <thead>
              <th>예약번호</th>
              <th>헬스장 명</th>
              <th>강사 명</th>
              <th>이용권</th>
              <th>상세보기</th>
            </thead>
            <tbody>
              {reservation.data.map((item, index) => (
                <tr
                  onClick={() => {
                    router.push(`/mypage/myreservation/detail/${item.id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <td>{item.id}</td>
                  <td>{item.gymName}</td>
                  <td>{item.trainerName}</td>
                  <td>{item.boughtService}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm mx-4"
                      style={{ width: "80px", height: "30px" }}
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*>PT일지 목록*/}
          <div>
            <div>
              <div className="d-flex mt-5">
                <p className={styles.p}>PT일지 목록</p>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={() => {
                    router.push("./diary/diary-list");
                  }}
                >
                  상세보기
                </button>
              </div>
              {/*-------------------------------임시*/}
            </div>

            <div className="d-flex justify-content-end align-items-center"></div>
          </div>
          {/*-------------------------------임시끝*/}

          <table className="table">
            <thead>
              <th>날짜</th>
              <th>식단내용</th>
              <th>운동내용</th>
              <th>문의사항</th>
              <th>담당강사</th>
              <th style={{ color: "red" }}>강사피드백</th>
            </thead>
            <tbody>
              {diary.data.map((item, index) => (
                <tr>
                  <td className={styles.text}>
                    {getTimeString(item.diaryCreateTime)}
                  </td>
                  <td className={styles.text}>{item.diaryMorning}</td>
                  <td className={styles.text}>{item.diaryRoutine}</td>
                  <td className={styles.text}>{item.diaryRequest}</td>
                  <td className={styles.text}>{item.trainerName}</td>
                  <td className={styles.text} style={{ color: "red" }}>
                    {item.trainerFeedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Mypage;
