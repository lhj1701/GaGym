import { MutableRefObject } from "react";
import React from "react";

import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";

import { useEffect, useRef } from "react";
import { DiaryItem } from "../../../provider/modules/diary";

import { requestAddDiary } from "../../../middleware/modules/diary";

import getTimeString from "../../../provider/modules/getTimeString";

const diaryCreate = () => {
  const memberName = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryMorning = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryLunch = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryDinner = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRoutine = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRequest = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerName = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerFeedback = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryCreateTime = useRef() as MutableRefObject<HTMLInputElement>;

  const diaryData = useSelector((state: RootState) => state.diary.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.diary.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);

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
      trainerName: trainerName.current?.value,
      trainerFeedback: trainerFeedback.current?.value,
      diaryCreateTime: new Date().getTime(),
    };
    dispatch(requestAddDiary(item));
    // dispatch(addDiary(item));
    router.push("/mypage/diary/diary-list");
  };
  const dateTime = new Date();

  return (
    <div>
      <AppBar />
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center my-4 mb-5">일지 작성</h2>
        <form className="mx-auto">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th>날짜</th>
                <td>??</td>
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
                <th>담당강사</th>
                <td>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="담당강사"
                    ref={trainerName}
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
    </div>
  );
};

export default diaryCreate;
