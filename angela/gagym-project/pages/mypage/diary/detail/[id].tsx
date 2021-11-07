import { MutableRefObject } from "react";

import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Diarycreate.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../../components/appbar";

//import { useParams } from "react-router-dom";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../provider";
import { requestRemoveDiary } from "../../../../middleware/modules/diary";
import { requestModifyDiary } from "../../../../middleware/modules/diary";
import { DiaryItem } from "../../../../provider/modules/diary";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const diaryDetail = ({ home }: HomeProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  let diaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.diary.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/mypage/diary/diary-list");
  }, [isRemoveCompleted, router]);

  const handleAddClick = () => {
    dispatch(requestRemoveDiary(+id));
    router.push("/mypage/diary/diary-list");
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Diary Detail 📃</h2>
      <form className="mx-auto">
        {diaryItem && (
          <table className="table">
            <tbody>
              <tr>
                <th>이름</th>
                <td>{diaryItem.memberName}</td>
              </tr>

              <tr>
                <th>아침식단</th>
                <td>{diaryItem.diaryMorning}</td>
              </tr>
              <tr>
                <th>점심식단</th>
                <td>{diaryItem.diaryLunch}</td>
              </tr>
              <tr>
                <th>저녁식단</th>
                <td>{diaryItem.diaryDinner}</td>
              </tr>
              <tr>
                <th>운동내역</th>
                <td>{diaryItem.diaryRoutine}</td>
              </tr>
              <tr>
                <th>문의사항</th>
                <td>{diaryItem.diaryRequest}</td>
              </tr>
              <tr>
                <th>강사 피드백</th>
                <td>{diaryItem.trainerFeedback}</td>
              </tr>
              <tr>
                <th>업데이트 시간</th>
                <td>{diaryItem.diaryCreateTime}</td>
              </tr>
            </tbody>
          </table>
        )}
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
          className="btn btn-dark btn-sm p-2 float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-trash me-1"></i>
          삭제
        </button>

        <button
          className="btn btn-warning btn-sm p-2 float-end me-1"
          onClick={() => {
            router.push(`/mypage/diary/edit/${id}`);
          }}
        >
          <i className="bi bi-pencil-square me-1"></i>
          <b>수정</b>
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

export default diaryDetail;
