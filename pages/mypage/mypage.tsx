import React, { useEffect } from "react";
import Head from "next/head";

import styles from "../../styles/mypage.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import Footer from "../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";

//1126추가
import { requestFetchPagingDiary } from "../../middleware/modules/diary";
import Layout from "../../components/layout";
//1126추가끝

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
    if (!diary.isFetched) {
      const diaryPageSize = localStorage.getItem("diary_page_size");

      dispatch(
        requestFetchPagingDiary({
          page: 0,
          size: diaryPageSize ? +diaryPageSize : diary.pageSize,
        })
      );
    }
  }, [dispatch, diary.isFetched, diary.pageSize]);

  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    dispatch(
      requestFetchPagingDiary({
        page,
        size: diary.pageSize,
      })
    );
  };

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingDiary({
        page: diary.page,
        size: +e.currentTarget.value,
      })
    );
  };
  //1126추가끝
  useEffect(() => {
    if (!reservation.isFetched || !diary.isFetched) {
      dispatch(requestFetchReservation());
    }
  }, [dispatch, reservation.isFetched]);

  return (
    <div>
      <AppBar />
      <Head>
        <title>GaGym</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sidemain}>
        <div className={styles.sidemenu}>
          <button
            className={styles.sidebtn1}
            onClick={() => {
              router.push("/mypage/mypage");
            }}
          >
            예약내역
          </button>
          <button
            className={styles.sidebtn2}
            onClick={() => {
              router.push("/mypage/diary/diary-list");
            }}
          >
            PT일지
          </button>
        </div>
        <main className={styles.main}>
          <div className={styles.div}>
            <div className="d-flex mt-5">
              <p className={styles.p}>[ 예약내역 ]</p>
            </div>
            <table className="table">
              <thead className={styles.thead}>
                <th>예약번호</th>
                <th>헬스장 명</th>
                <th>강사 명</th>
                <th>이용권</th>
              </thead>
              <tbody className={styles.tbody}>
                {reservation.data.map((item, index) => (
                  <tr
                    key={`reservation-item-${index}`}
                    onClick={() => {
                      router.push(`/mypage/myreservation/detail/${item.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{item.id}</td>
                    <td>{item.gymName}</td>
                    <td>{item.trainerName}</td>
                    <td>{item.boughtService}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/*>PT일지 목록*/}
            <div>
              <div>
                <div className="d-flex mt-5">
                  <p className={styles.p}>[ PT일지 목록 ]</p>
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
              </div>

              <div className="d-flex justify-content-end align-items-center"></div>
            </div>

            <table className="table">
              <thead className={styles.thead}>
                <tr>
                  <th>날짜</th>
                  <th>식단내용</th>
                  <th>운동내용</th>
                  <th>문의사항</th>
                  <th>담당강사</th>
                  <th style={{ color: "red" }}>강사피드백</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {diary.data.map((item, index) => (
                  <tr key={index}>
                    <td
                      style={{ cursor: "pointer", color: "rgb(3, 48, 129)" }}
                      className={styles.textd}
                      onClick={() => {
                        router.push(`/mypage/diary/detail/${item.id}`);
                      }}
                      key={index}
                    >
                      <b>{getTimeString(item.diaryCreateTime)}</b>
                      {/* <b>11/12</b> */}
                    </td>
                    <td className={styles.text}>{item.diaryMorning}</td>
                    <td className={styles.text}>{item.diaryRoutine}</td>
                    <td className={styles.text}>{item.trainerName}</td>
                    <td className={styles.text}>{item.diaryRequest}</td>

                    <td className={styles.text} style={{ color: "red" }}>
                      {item.trainerFeedback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Mypage;
