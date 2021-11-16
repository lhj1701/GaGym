import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

//import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../provider";
import {
  requestFetchDiary,
  requestFetchDiaryItem,
  requestRemoveDiary,
} from "../../../../middleware/modules/diary";

import AppBar from "../../../../components/appbar";

import getTimeString from "../../../../provider/modules/getTimeString";

const DiaryDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  const diary = useSelector((state: RootState) => state.diary);

  let diaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );

  useEffect(() => {
    if (!diary.isFetched) {
      dispatch(requestFetchDiary());
    }
  }, [dispatch, diary.isFetched]);

  if (id) {
    // redux에 데이터가 없으면
    if (!diaryItem) {
      // 1건에 데이터를 가져와 store에 추가함
      dispatch(requestFetchDiaryItem(+id));
    }
  }

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
    <div>
      <AppBar />
      <div style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center my-4 mb-5">일지 상세</h2>
        <form className="mx-auto">
          {diaryItem && (
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <th>날짜</th>
                  <td>{getTimeString(diaryItem.diaryCreateTime)}</td>
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
                  <th>담당 강사</th>
                  <td>{diaryItem.trainerName}</td>
                </tr>
                <tr>
                  <th>강사 피드백</th>
                  <td style={{ color: "red" }}>
                    (diaryItem.trainerFeedback) 받기
                  </td>
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
    </div>
  );
};

export default DiaryDetail;
