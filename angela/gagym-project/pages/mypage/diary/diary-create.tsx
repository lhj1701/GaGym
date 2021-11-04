import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/diary/Diarycreate.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";

import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/pagination";
import { AppDispatch, RootState } from "../../../provider";
import {
  requestFetchDiarys,
  requestFetchPagingDiarys,
} from "../../../middleware/modules/diary";

import { useEffect, useRef } from "react";
import { DiaryItem } from "../../../provider/modules/diary";
//import { addDiary } from "./diarySlice";

import { requestAddDiary } from "../../../middleware/modules/diary";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const diaryCreate = ({ home }: HomeProp) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  //    const inputRef = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);

  const diaryData = useSelector((state: RootState) => state.diary.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.diary.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);
    // true이면 화면이동

    //------------여기 경로 다시확인15:42
    isAddCompleted && router.push("/mypage/diary/diary-list");
  }, [isAddCompleted, router, dispatch]);

  const handleSaveClick = () => {
    const item: DiaryItem = {
      id: diaryData.length > 0 ? diaryData[0].id + 1 : 1,
      memberName: memberName.current?.value,
      diaryMorning: diaryMorning.current?.value,
      diaryLunch: diaryLunch.current?.value,
      diaryDinner: diaryDinner.current?.value,
      diaryRoutine: diaryRoutine.current?.value,
      diaryRequest: diaryRequest.current?.value,
      trainerFeedback: trainerFeedback.current?.value,
      diaryCreateTime: new Date().getTime(),
    };
    dispatch(requestAddDiary(item));
    // dispatch(addDiary(item));
    router.push("/mypage/diary/diary-list");

    /* 윗줄 추가하고 잠깐 임시로
// ----- 기존 redux action -----
dispatch(addDiary(item));
        router.push("/diarys");
*/
    // formRef.current?.reset();
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Diary Create 📃</h2>
      <form className="mx-auto">
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="이름"
                  ref={memberName}
                />
              </td>
            </tr>

            <tr>
              <th>아침식단</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="아침식단"
                  ref={diaryMorning}
                />
              </td>
            </tr>
            <tr>
              <th>점심식단</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="점심식단"
                  ref={diaryLunch}
                />
              </td>
            </tr>
            <tr>
              <th>저녁식단</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="저녁식단"
                  ref={diaryDinner}
                />
              </td>
            </tr>
            <tr>
              <th>운동내역</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="운동내역"
                  ref={diaryRoutine}
                />
              </td>
            </tr>
            <tr>
              <th>문의사항</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="문의사항"
                  ref={diaryRequest}
                />
              </td>
            </tr>
            <tr>
              <th>강사 피드백</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="강사 피드백"
                  ref={trainerFeedback}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="mt-3">
        <button
          className="btn btn-light border border-2 btn-sm p-2 float-start"
          onClick={() => {
            router.push("/mypage/diary/diary-list");
          }}
        >
          <i className="bi bi-list me-1"></i>
          목록
        </button>
        <button
          className="btn btn-dark float-end btn-sm p-2"
          onClick={() => {
            handleSaveClick();
          }}
        >
          <i className="bi bi-save me-1"></i>
          저장
        </button>
      </div>
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

export default diaryCreate;
