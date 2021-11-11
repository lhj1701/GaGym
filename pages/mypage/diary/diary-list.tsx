import React from "react";

import styles from "../../../styles/Diarylist.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { requestFetchPagingDiarys } from "../../../middleware/modules/diary";

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  var month = ("0" + (1 + dateTime.getMonth())).slice(-2);
  var day = ("0" + dateTime.getDate()).slice(-2);
  return month + "/" + day;
};

const diaryList = () => {
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
            </div>
          </div>
          <table className="table table-hover">
            <thead className="display-flex;">
              <tr>
                <th>날짜</th>
                <th>아침식단</th>
                <th>점심식단</th>
                <th>저녁식단</th>
                <th>운동내역</th>
                <th>문의사항</th>
                <th>담당 강사</th>
                <th style={{ color: "red" }}>강사 피드백</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {diary.data.map((item, index) => (
                <tr className="display-flex">
                  <td
                    style={{ cursor: "pointer" }}
                    className={styles.text}
                    onClick={() => {
                      router.push(`/mypage/diary/detail/${item.id}`);
                    }}
                  >
                    {getTimeString(item.diaryCreateTime)}
                  </td>
                  <td className={styles.text}>{item.diaryMorning}</td>
                  <td className={styles.text}>{item.diaryLunch}</td>
                  <td className={styles.text}>{item.diaryDinner}</td>
                  <td className={styles.text}>{item.diaryRoutine}</td>
                  <td className={styles.text}>{item.diaryRequest}</td>
                  <td className={styles.text}>{item.trainerName}</td>
                  <td className={styles.text} style={{ color: "red" }}>
                    {item.trainerFeedback}
                  </td>
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

export default diaryList;
