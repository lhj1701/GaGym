import { MutableRefObject } from "react";
import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import Footer from "../../../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { useEffect, useRef } from "react";
import { DiaryItem } from "../../../provider/modules/diary";
import { requestAddDiary } from "../../../middleware/modules/diary";
import styles from "../../../styles/Diarycreate.module.css";

const DiaryCreate = () => {
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
    <div className={styles.div1}>
      <AppBar />
      <div className={styles.div2}>
        <div className={styles.div3}>
          <h2 className={styles.h2}>일지 작성</h2>
        </div>
        <form className="mx-auto">
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th className={styles.th}>회원명</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="회원명을 작성 해 주세요"
                    ref={memberName}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>아침식단</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="아침식단을 작성 해 주세요"
                    ref={diaryMorning}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>점심식단</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="점심식단을 작성 해 주세요"
                    ref={diaryLunch}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>저녁식단</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="저녁식단을 작성 해 주세요"
                    ref={diaryDinner}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>운동내역</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="운동내역을 작성 해 주세요"
                    ref={diaryRoutine}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>문의사항</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="문의사항을 작성 해 주세요"
                    ref={diaryRequest}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>담당강사</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="담당강사를 작성 해 주세요"
                    ref={trainerName}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        <div className={styles.btndiv}>
          <button
            className={styles.btn1}
            onClick={() => {
              router.push("/mypage/diary/diary-list");
            }}
          >
            목록
          </button>
          <button
            className={styles.btn2}
            onClick={() => {
              handleSaveClick();
            }}
          >
            저장
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiaryCreate;
