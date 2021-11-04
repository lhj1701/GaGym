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
//import { DiaryItem } from "./diarySlice";
//import { modifyDiary } from "./diarySlice";

import { requestModifyDiary } from "../../../../middleware/modules/diary";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const diaryEdit = ({ home }: HomeProp) => {
  const router = useRouter();

  const id = router.query.id as string;

  const DiaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.diary.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  /*
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);
*/
  const memberName = useRef<HTMLInputElement>(null);
  const diaryMorning = useRef<HTMLInputElement>(null);
  const diaryLunch = useRef<HTMLInputElement>(null);
  const diaryDinner = useRef<HTMLInputElement>(null);
  const diaryRoutine = useRef<HTMLInputElement>(null);
  const diaryRequest = useRef<HTMLInputElement>(null);
  const trainerFeedback = useRef<HTMLInputElement>(null);
  const diaryCreateTime = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("--isEditcompleted 변경: ");

    //------------여기 경로 다시확인15:42
    isModifyCompleted && router.push("/mypage/diary/diary-list");
  }, [isModifyCompleted, router]);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const handleSaveClick = () => {
    if (DiaryItem) {
      const item = { ...DiaryItem };
      /*
      item.select = selectRef.current?.value;
      item.txtName = inputRef1.current?.value;
      item.txtContact = inputRef2.current?.value;
      item.txtEmail = inputRef3.current?.value;
      item.memo = memo.current?.value;
*/
      item.memberName = memberName.current?.value;
      item.diaryMorning = diaryMorning.current?.value;
      item.diaryLunch = diaryLunch.current?.value;
      item.diaryDinner = diaryDinner.current?.value;
      item.diaryRoutine = diaryRoutine.current?.value;
      item.diaryRequest = diaryRequest.current?.value;
      item.trainerFeedback = trainerFeedback.current?.value;
      item.diaryCreateTime = diaryCreateTime.current?.value;

      dispatch(requestModifyDiary(item));
      //dispatch(modifyDiary(item));
      router.push("/mypage/diary/diary-list");
    }
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Diary Edit ✍🏻</h2>
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
                  placeholder="이름 수정"
                  defaultValue={DiaryItem?.memberName}
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
                  placeholder="식단 수정"
                  defaultValue={DiaryItem?.diaryMorning}
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
                  placeholder="식단 수정"
                  defaultValue={DiaryItem?.diaryLunch}
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
                  placeholder="식단 수정"
                  defaultValue={DiaryItem?.diaryDinner}
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
                  placeholder="운동내역 수정"
                  defaultValue={DiaryItem?.diaryRoutine}
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
                  placeholder="문의사항 수정"
                  defaultValue={DiaryItem?.diaryRequest}
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
                  placeholder="강사 피드백 수정"
                  defaultValue={DiaryItem?.trainerFeedback}
                  ref={trainerFeedback}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="mt-3">
        <button
          className="btn btn-light border border-2 btn-sm p-2  float-start"
          onClick={() => {
            router.push("/mypage/diary/diary-list");
          }}
        >
          <i className="bi bi-list me-1"></i>
          목록
        </button>
        <button
          className="btn btn-dark btn-sm p-2  float-end"
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

export default diaryEdit;
