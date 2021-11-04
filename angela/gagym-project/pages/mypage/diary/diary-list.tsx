import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Diarydetail.module.css";
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
    // console.log(dispatch);
    // console.log(diary.isFetched);
    // 데이터 fetch가 안되었으면 데이터를 받아옴
    if (!diary.isFetched) {
      // 서버에서 데이터를 받아오는 action을 디스패치함
      // dispatch(requestFetchDiarys());
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
    // setCurrentPage(page);
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
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center my-5">
          <u>Diary</u>
        </h2>
      </div>
      {/* 버튼    <div className="d-flex justify-content-start">*/}
      <div>
        <div className="d-flex justify-content-start">
          <div>
            <button
              type="button"
              className="btn btn-primary text-nowrap btn-sm"
            >
              <i className="bi bi-person-dash-fill me-2"></i>
              삭제
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-dark text-nowrap btn-sm mx-2"
              onClick={() => {
                router.push("/mypage/diary/diary-create");
              }}
            >
              <i className="bi bi-person-plus-fill me-2"></i>
              추가
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          {/*-----------------*/}
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={() => {
              dispatch(requestFetchDiarys());
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
          <select
            className="form-select form-select-sm me-2 p-1"
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
              <td className="p-2">
                <input
                  className="checkbox mt-1"
                  style={{ zoom: 1.3 }}
                  type="checkbox"
                  onChange={onEvent}
                />
              </td>
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
              <td>{getTimeString(item.createdTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <div className="d-flex justify-content-center mt-4"></div>
    </div>
  );
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/homes/1");

  const home: Home = await res.json();

  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  return { props: { home } };
}

export default diaryList;
