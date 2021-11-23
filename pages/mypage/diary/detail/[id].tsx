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
import Footer from "../../../../components/footer";

import getTimeString from "../../../../provider/modules/getTimeString";

import styles from "../../../../styles/Diarydetail.module.css";

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
    <div className={styles.div1}>
      <AppBar />
      <div className={styles.div2}>
        {/* <h2 className="text-center my-4 mb-5">일지 상세</h2> */}
        <div className={styles.div3}>
          <h2 className={styles.h2}>일지 상세</h2>
        </div>
        <form className="mx-auto">
          {diaryItem && (
            // <table className="table table-borderless">
            <table className={styles.table}>
              <tbody>
                <tr className={styles.tr}>
                  <th className={styles.th}>날짜</th>
                  <td className={styles.td}>
                    {getTimeString(diaryItem.diaryCreateTime)}
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>회원명</th>
                  <td className={styles.td}>{diaryItem.memberName}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>아침식단</th>
                  <td className={styles.td}>{diaryItem.diaryMorning}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>점심식단</th>
                  <td className={styles.td}>{diaryItem.diaryLunch}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>저녁식단</th>
                  <td className={styles.td}>{diaryItem.diaryDinner}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>운동내역</th>
                  <td className={styles.td}>{diaryItem.diaryRoutine}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>문의사항</th>
                  <td className={styles.td}>{diaryItem.diaryRequest}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>담당 강사</th>
                  <td className={styles.td}>{diaryItem.trainerName}</td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>강사 피드백</th>
                  <td className={styles.td}>{diaryItem.trainerFeedback}</td>
                </tr>
              </tbody>
            </table>
          )}
        </form>

        <div className={styles.btndiv}>
          <button
            // className="btn btn-light border border-2 btn-sm p-2 float-start"
            className={styles.btn1}
            onClick={() => {
              router.push("/mypage/diary/diary-list");
            }}
          >
            목록
          </button>
          <div>
            <button
              // className="btn btn-warning btn-sm p-2 float-end me-1"
              className={styles.btn2}
              onClick={() => {
                router.push(`/mypage/diary/edit/${id}`);
              }}
            >
              수정
            </button>
            <button
              // className="btn btn-dark btn-sm p-2 float-end"
              className={styles.btn3}
              onClick={() => {
                handleAddClick();
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiaryDetail;
