import { MutableRefObject } from "react";
import React from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../provider";
import { requestModifyDiary } from "../../../../middleware/modules/diary";
import AppBar from "../../../../components/appbar";
import Footer from "../../../../components/footer";
import getTimeString from "../../../../provider/modules/getTimeString";
import styles from "../../../../styles/Diaryedit.module.css";

const DiaryEdit = () => {
  const memberName = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryMorning = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryLunch = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryDinner = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRoutine = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryRequest = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerName = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerFeedback = useRef() as MutableRefObject<HTMLInputElement>;
  const diaryCreateTime = useRef() as MutableRefObject<HTMLInputElement>;

  const DiaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.diary.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const id = router.query.id as string;

  useEffect(() => {
    isModifyCompleted && router.push("/mypage/diary/diary-list");
  }, [isModifyCompleted, router]);

  const handleSaveClick = () => {
    if (DiaryItem) {
      const item = { ...DiaryItem };

      item.memberName = memberName.current?.value;
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
    <div className={styles.div1}>
      <AppBar />
      <div className={styles.div2}>
        <div className={styles.div3}>
          <h2 className={styles.h2}>?????? ??????</h2>
        </div>
        <form className="mx-auto">
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tr}>
                <th className={styles.th}>??????</th>
                <td className={styles.td}>
                  {getTimeString(DiaryItem?.diaryCreateTime)}
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>?????????</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="?????? ??????"
                    defaultValue={DiaryItem?.memberName}
                    ref={memberName}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>????????????</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="?????? ??????"
                    defaultValue={DiaryItem?.diaryMorning}
                    ref={diaryMorning}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>????????????</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="?????? ??????"
                    defaultValue={DiaryItem?.diaryLunch}
                    ref={diaryLunch}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>????????????</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="?????? ??????"
                    defaultValue={DiaryItem?.diaryDinner}
                    ref={diaryDinner}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>????????????</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="???????????? ??????"
                    defaultValue={DiaryItem?.diaryRoutine}
                    ref={diaryRoutine}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>????????????</th>
                <td className={styles.td}>
                  {" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="???????????? ??????"
                    defaultValue={DiaryItem?.diaryRequest}
                    ref={diaryRequest}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>?????? ??????</th>
                <td className={styles.td}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="???????????? ??????"
                    defaultValue={DiaryItem?.trainerName}
                    ref={trainerName}
                  />
                </td>
              </tr>
              <tr className={styles.tr}>
                <th className={styles.th}>?????? ?????????</th>
                <td className={styles.td}>{DiaryItem?.trainerFeedback}</td>
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
            ??????
          </button>
          <button
            className={styles.btn2}
            onClick={() => {
              handleSaveClick();
            }}
          >
            ??????
          </button>
        </div>
      </div>
      <Footer />t
    </div>
  );
};

export default DiaryEdit;
