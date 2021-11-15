import { MutableRefObject } from "react";

import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../provider";

import { requestModifyDiary } from "../../../../middleware/modules/diary";

import AppBar from "../../../../components/appbar";

import getTimeString from "../../../../provider/modules/getTimeString";

const DiaryEdit = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const DiaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.diary.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const memberName = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryMorning = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryLunch = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryDinner = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRoutine = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRequest = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerName = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerFeedback = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryCreateTime = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    isModifyCompleted && router.push("/mypage/diary/diary-list");
  }, [isModifyCompleted, router]);

  const handleSaveClick = () => {
    if (DiaryItem) {
      const item = { ...DiaryItem };

      // item.memberName = memberName.current?.value;
      item.diaryMorning = diaryMorning.current?.value;
      item.diaryLunch = diaryLunch.current?.value;
      item.diaryDinner = diaryDinner.current?.value;
      item.diaryRoutine = diaryRoutine.current?.value;
      item.diaryRequest = diaryRequest.current?.value;
      item.trainerName = trainerName.current?.value;
      item.trainerFeedback = trainerFeedback.current?.value;
      // item.diaryCreateTime = diaryCreateTime.current?.value;

      dispatch(requestModifyDiary(item));
      // dispatch(modifyDiary(item));
      router.push("/mypage/diary/diary-list");
    }
  };

  return (
    <div>
      <AppBar />

      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center my-4 mb-5">일지 수정</h2>
        <form className="mx-auto">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <th>날짜</th>
                <td>{getTimeString(DiaryItem?.diaryCreateTime)}</td>
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
                <th>담당 강사</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="담당강사 수정"
                    defaultValue={DiaryItem?.trainerName}
                    ref={trainerName}
                  />
                </td>
              </tr>
              <tr>
                <th>강사 피드백</th>
                <td>(DiaryItem?.trainerFeedback) 받기</td>
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
    </div>
  );
};

export default DiaryEdit;
