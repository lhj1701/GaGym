import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../../styles/Diarylist.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/pagination";
import { AppDispatch, RootState } from "../../../provider";
import {
  requestFetchDiarys,
  requestFetchPagingDiarys,
} from "../../../middleware/modules/diary";

import diaryApi from "../../../api/diary";
import { DiaryItemResponse } from "../../../api/diary";

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString([], {
    month: "2-digit",
    day: "2-digit",
  })} ⏱${dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
};

interface HomeProp {
  home: Home;

  //diarys: DiaryItemResponse[];
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const diaryList = ({ home }: HomeProp) => {
  const diary = useSelector((state: RootState) => state.diary);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!diary.isFetched) {
      dispatch(
        requestFetchPagingDiarys({
          page: 0,
          size: diary.pageSize,
        })
      );
    }
  }, [dispatch, diary.isFetched, diary.pageSize]);

  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    dispatch(
      requestFetchPagingDiarys({
        page,
        size: diary.pageSize,
      })
    );
  };

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingDiarys({
        page: diary.page,
        size: +e.currentTarget.value,
      })
    );
  };

  const onEvent = (e: any) => {
    console.log(e.type, "", e);
  };

  return (
    <div>
      <AppBar />
      <main className={styles.main}>
        <div className={styles.div}>
          {/*>PT일지 목록*/}
          <div>
            <div className="mx-auto">
              <div className="d-flex flex-direction-column align-items-baseline mt-5">
                <p className={styles.p}>PT일지 목록</p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mx-3"
                  style={{ width: "80px;", height: "30px" }}
                  onClick={() => {
                    router.push("/mypage/diary/diary-create");
                  }}
                >
                  일지 작성
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center">
              {/*-----------------*/}
              {/*
              <button
                className="btn btn-secondary btn-sm"
                style={{ width: "100px;" }}
                onClick={() => {
                  dispatch(requestFetchDiarys());
                }}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
              */}
              <select
                className="form-select form-select-sm mx-1 p-1"
                style={{ width: "55px", height: "30px" }}
                onChange={(e) => {
                  handlePageSizeChanged(e);
                }}
              >
                {[3, 5, 10, 20].map((size) => (
                  <option value={size} selected={diary.pageSize === size}>
                    {size}
                  </option>
                ))}
              </select>
              {/*-----------------*/}
              {/*
         <select
          className="form-select form-select-sm"
          style={{ width: "60px" }}
          >
            <option>3</option>
            <option>5</option>
            <option>10</option>
        </select>
*/}
            </div>
          </div>
          <table className="table table-striped table table-hover">
            <thead className="display-flex;">
              <tr>
                <th>이름</th>
                <th>아침식단</th>
                <th>점심식단</th>
                <th>저녁식단</th>
                <th>운동내역</th>
                <th>문의사항</th>
                <th>강사 피드백</th>
                <th>업데이트 시간</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {diary.data.map((item, index) => (
                <tr className="display-flex">
                  {/*
          <td className="text-center">❤{item.select}</td> 
*/}
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/mypage/diary/detail/${item.id}`);
                    }}
                  >
                    ({item.id}) {item.memberName}
                  </td>
                  <td>{item.diaryMorning}</td>
                  <td>{item.diaryLunch}</td>
                  <td>{item.diaryDinner}</td>
                  <td>{item.diaryRoutine}</td>
                  <td>{item.diaryRequest}</td>
                  <td>{item.trainerFeedback}</td>
                  <td>{getTimeString(item.diaryCreateTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* 페이지네이션 */}
          <div className="d-flex justify-content-center mt-4"></div>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/homes/1");
  const home: Home = await res.json();

  //  const res = await diaryApi.fetchPaging(0, 4);
  //const diarys: res.data.content;

  //배열로 임시로 넣어보려고 했는데, 잘 안되넹..
  /*
  const diarys = [
    {
      id: 5,
      memberName: "박5",
      diaryMorning: "닭가슴살5",
      diaryLunch: "호박죽",
      diaryDinner: "현미밥",
      diaryRoutine: "필라테스 2시간",
      diaryRequest: "-",
      trainerFeedback: "-",
      diaryCreateTime: 1636012151456,
    },
    {
      id: 4,
      memberName: "박4",
      diaryMorning: "닭가슴살4",
      diaryLunch: "호박죽",
      diaryDinner: "현미밥",
      diaryRoutine: "필라테스 2시간",
      diaryRequest: "-",
      trainerFeedback: "-",
      diaryCreateTime: 1636012151456,
    },
    {
      id: 3,
      memberName: "박3",
      diaryMorning: "닭가슴살3",
      diaryLunch: "호박죽",
      diaryDinner: "현미밥",
      diaryRoutine: "필라테스 2시간",
      diaryRequest: "-",
      trainerFeedback: "-",
      diaryCreateTime: 1636012151456,
    },
    {
      id: 2,
      memberName: "박2",
      diaryMorning: "닭가슴살2",
      diaryLunch: "호박죽",
      diaryDinner: "현미밥",
      diaryRoutine: "필라테스 2시간",
      diaryRequest: "-",
      trainerFeedback: "-",
      diaryCreateTime: 1636012151456,
    },
    {
      id: 1,
      memberName: "박",
      diaryMorning: "닭가슴살",
      diaryLunch: "호박죽",
      diaryDinner: "현미밥",
      diaryRoutine: "필라테스 2시간",
      diaryRequest: "-",
      trainerFeedback: "-",
      diaryCreateTime: 1636012151456,
    },
  ];
*/
  return { props: { home } };

  //return { props: { diarys: res.data.content } };
}

export default diaryList;
