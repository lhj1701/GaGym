import React from "react";
import Head from "next/head";

import styles from "../../styles/Mypage.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}


const mypage = () => {
  const router = useRouter();
  const reservation = useSelector((state: RootState) => state.reservation);

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
          {/*진행중인 예약내역*/}
          <div className="d-flex">
            <p className={styles.p}>진행중인 예약내역</p>
          </div>
          <table className="table ">
            <thead>
              <th>내 지역</th>
              <th>헬스장 명</th>
              <th>예약번호</th>
              <th>구매한 이용권</th>
              <th>현재 남은 이용횟수 이용권</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          {/*예약내역*/}
          <div className="d-flex mt-5">
            <p className={styles.p}>예약내역</p>
          </div>
          <table className="table">
            <thead>
              <th>예약번호</th>
              <th>헬스장 명</th>
              <th>강사 명</th>
              <th>이용권</th>
              <th>이용가격</th>
              <th>상세보기</th>
            </thead>
            <tbody>
              {reservation.data.map((item,index)=>(
              <tr onClick={() => {
                router.push(`/mypage/myreservation/detail/${item.id}`);
              }} style={{ cursor:"pointer" }}>
                <td>{item.id}</td>
                <td>{item.gymName}</td>
                <td>{item.trainerName}</td>
                <td>{item.boughtService}</td>
                <td>{item.price}</td>
                <td><button
              type="button"
              className="btn btn-secondary btn-sm mx-4"
              style={{ width: "80px;", height: "30px" }}
            >
              상세보기
            </button></td>
              </tr>
               ))}
            </tbody>
          </table>
          {/*>PT일지 목록*/}
          <div className="d-flex mt-5">
            <p className={styles.p}>PT일지 목록</p>
            <button
              type="button"
              className="btn btn-secondary btn-sm mx-4"
              style={{ width: "80px;", height: "30px" }}
              onClick={() => {
                router.push("./diary/diary-list");
              }}
            >
              상세보기
            </button>
          </div>
          <table className="table">
            <thead>
              <th>날짜</th>
              <th>식단내용</th>
              <th>운동내용</th>
              <th>문의사항</th>
              <th>담당강사</th>
              <th>강사피드백</th>
            </thead>
            <tbody>
              <tr>
                <td>10/25</td>
                <td>(아침) 고구마/우유</td>
                <td>PT + 런닝2시간</td>
                <td>-</td>
                <td>-</td>
                <td>미완료</td>
              </tr>
              <tr>
                <td>10/25</td>
                <td>(아침) 고구마/우유</td>
                <td>PT + 런닝2시간</td>
                <td>-</td>
                <td>-</td>
                <td>미완료</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default mypage;
