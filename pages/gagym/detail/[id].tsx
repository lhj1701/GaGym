import React from "react";
import Image from "next/image";
import styles from "../../../styles/Gymdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import { useRouter } from "next/router";
import Footer from "../../../components/footer";

import { GetServerSideProps } from "next";
import axios from "axios";

interface GymDetails {
  albumId: number;
  id: number;
  gymName: string;
  gymCoNum: string;
  gymLocateSi: string;
  gymLocateGunGu: string;
  gymAddress: string;
  gymPhoneNum: string;
  gymTime: string;
  gymService: string;
  gymPhoto: string;
  fileName: string;
  fileType: string;
  gym1DayPrice: string;
  gym3DayPrice: string;
  gym7DayPrice: string;
  gymMonthPrice: string;
  gym3MonthPrice: string;
  gym6MonthPrice: string;
  gymYearPrice: string;
}

interface Trainers {
  albumId: number;
  id: number;
  gymCode: string;
  trainerName: string;
  trainerIntro: string;
  trainerPhotoUrl: string;
  pt1TimePrice: string;
  pt10TimePrice: string;
  pt30TimePrice: string;
  yoga1TimePrice: string;
  yoga10TimePrice: string;
  yoga30TimePrice: string;
  pilates1TimePrice: string;
  pilates10TimePrice: string;
  pilates30TimePrice: string;
}

interface GymDetailProp {
  gymDetail: GymDetails;
  trainers: Trainers[];
}

const GymDetail = ({ gymDetail, trainers }: GymDetailProp) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div className={styles.container}>
      <AppBar />
      <main className={styles.main} key={`${gymDetail.id}`}>
        <div className={styles.div}>
          {/* 1. 헬스장 사진 + 내용 + 예약버튼 */}
          <div className="d-flex mt-5">
            <div style={{ cursor: "pointer" }} className={styles.src}>
              {/* 11/17 사진-희균님 데이터 받아오기 전까지 잠시 주석*/}
              <Image
                // src={gymDetail.gymPhoto}
                src={"/gymimg/1 (1).jpg"} //1118임시
                className="card-img-top"
                alt={gymDetail.gymName}
                layout="responsive"
                objectFit="cover" //써야됨 or none
                width={300}
                height={300}
              />
            </div>

            {/* 내용 */}
<<<<<<< HEAD
            <div style={{ width: "auto", height: "300px" }}>
=======
            <div style={{ width: "auto", height: "300px" }} className="px-3">
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
              {/* 헬스장명 */}
              <h3>{gymDetail.gymName}</h3>
              {/* 헬스장주소 */}
              <h6>{gymDetail.gymAddress}</h6>
              {/* 헬스장 전화번호 */}
              <h6>{gymDetail.gymPhoneNum}</h6>
<<<<<<< HEAD
              <h6>{gymDetail.gymCoNum}//임시</h6>
=======
              {/* <h6>{gymDetail.gymCoNum}//임시</h6> */}
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
              {/* 헬스장 운영시간 */}
              <p className={styles.p}>
                <b>[운영시간]</b>
                <br />
                {gymDetail.gymTime}
              </p>
              {/* 예약버튼 */}
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className={styles.btnrsv}
                  style={{ width: "350px" }}
                  onClick={() => {
                    router.push(`../../mypage/myreservation/create/${id}`);
                  }}
                >
                  예약하러 가기
                </button>
              </div>
            </div>
          </div>
          {/*--------------2. 강사소개/이용권/헬스장사진/부가서비스 시작 --------------*/}
          {/* 강사소개 */}
          <h4 className={styles.h4}>강사 소개 및 이용권</h4>
<<<<<<< HEAD

=======
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
          {/*강사소개+이용권*/}
          {trainers.map((item, index) => (
            <div className="d-flex mt-5 align-items-center">
              {/*(왼쪽)강사소개*/}
              <div className="mx-5">
                <img
                  // src={gymDetail.trainerPhotoUrl}
                  src={"/trainer/trainer (1).jpg"} //1118임시
                  className={styles.imgd}
                />
                <div className={styles.divsp}>
                  <span>{item.trainerName}</span>
                  <br />
                  <span>{item.trainerIntro}</span>
                  <br />
                </div>
              </div>
              {/*(오른쪽)이용권*/}
              <div>
                <table className={styles.table1}>
                  <tr>
                    <th className={styles.th1}></th>
                    <th className={styles.th1}>1회</th>
                    <th className={styles.th1}>10회</th>
                    <th className={styles.th1}>30회</th>
                  </tr>
                  <tr>
                    <td className={styles.td1c}>P.T</td>
                    <td className={styles.td1}>{item.pt1TimePrice}</td>
                    <td className={styles.td1}>{item.pt10TimePrice}</td>
                    <td className={styles.td1}>{item.pt30TimePrice}</td>
                  </tr>
                  <tr>
                    <td className={styles.td1c}>필라테스</td>
                    <td className={styles.td1}>{item.pilates1TimePrice}</td>
                    <td className={styles.td1}>{item.pilates10TimePrice}</td>
                    <td className={styles.td1}>{item.pilates30TimePrice}</td>
                  </tr>
                  <tr>
                    <td className={styles.td1c}>요가</td>
                    <td className={styles.td1}>{item.yoga1TimePrice}</td>
                    <td className={styles.td1}>{item.yoga10TimePrice}</td>
                    <td className={styles.td1}>{item.yoga30TimePrice}</td>
                  </tr>
                </table>
              </div>
            </div>
          ))}
          {/* 헬스장 이용권 */}
          <h4 className={styles.h4}>헬스장 이용권</h4>
          {/*------임시*/}
          <div className="d-flex">
            <div className={styles.divspan}>
              <span className={styles.span1}>1일권</span>
              <span className={styles.span2}>{gymDetail.gym1DayPrice}</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span1}>3일권</span>
              <span className={styles.span2}>{gymDetail.gym3DayPrice}</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span1}>7일권</span>
              <span className={styles.span2}>{gymDetail.gym7DayPrice}</span>
            </div>
          </div>
          <div className="d-flex">
            <div className={styles.divspan}>
              <span className={styles.span3}>1개월</span>
              <span className={styles.span4}>{gymDetail.gymMonthPrice}</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span3}>3개월</span>
              <span className={styles.span4}>{gymDetail.gym3MonthPrice}</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span3}>6개월</span>
              <span className={styles.span4}>{gymDetail.gym6MonthPrice}</span>
            </div>
            <div className={styles.divspan}>
              <span className={styles.span3}>12개월</span>
              <span className={styles.span4}>{gymDetail.gymYearPrice}</span>
            </div>
          </div>
<<<<<<< HEAD

=======
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
          {/* 부가서비스 */}
          <h4 className={styles.h4}>부가서비스</h4>
          <div className="mb-5">{gymDetail.gymService}</div> {/*추후없앨예정*/}
          <div className={styles.divser1}>
            <div className={styles.divser11}>
              <img
                src={"/gymservice/inbody.png"}
                style={{ width: "100px" }}
                // className={styles.imgd}
              />
              <span className={styles.divser111}>인바디 측정</span>
            </div>
            <div className={styles.divser11}>
              <img
                src={"/gymservice/locker.png"}
                style={{ width: "100px" }}

                // className={styles.imgd}
              />
              <span className={styles.divser111}>라커룸</span>
            </div>
            <div className={styles.divser11}>
              <img
                src={"/gymservice/shower.png"}
                style={{ width: "100px" }}

                // className={styles.imgd}
              />
              <span className={styles.divser111}>샤워시설</span>
            </div>
            <div className={styles.divser11}>
              <img
                src={"/gymservice/wifi.png"}
                style={{ width: "100px" }}

                // className={styles.imgd}
              />
              <span className={styles.divser111}>와이파이</span>
            </div>
          </div>
          {/*강사소개/이용권/헬스장사진/부가서비스/공지사항 끝*/}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string; // as string

  //axios처리 {gymDetail}
  const res = await axios.get<GymDetails[]>(
    `http://localhost:8080/gagym/detail/{id}`
  );

  const gymDetail = res.data.find((item) => item.id === +id);

  //axios처리 {trainer}
  const trainer = await axios.get<Trainers[]>(
    `http://localhost:8080/gagym/detail/trainer`
  );

  const trainers = trainer.data.filter(
    (item) => item.gymCode == gymDetail.gymCoNum
  );

  // 11/17 더미데이터 주석처리
  // const gymDetail = [
  //   {
  //     //      albumId: 1,
  //     id: 39,
  //     gymName: "강남 화이트짐",
  //     gymPhoto: "/gymimg/1 (1).jpg",
  //     gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
  //     gymCoNum: "110-203-10230",

  //     gymTime:
  //       "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "/trainer/trainer (1).jpg",
  //     trainerIntro: "강사 박00 입니다.",
  //     gym1DayPrice: "20000원",
  //     gym3DayPrice: "30000원",
  //     gym7DayPrice: "50000원",
  //     gymMonthPrice: "20000원",
  //     gym3MonthPrice: "200000원",
  //     gym6MonthPrice: "400000원",
  //     gymYearPrice: "800000원",
  //   },
  //   {
  //     //      albumId: 1,
  //     id: 2,
  //     gymName: "논현 REGENT 프라이빗짐",
  //     gymPhoto: "/gymimg/2 (1).jpg",
  //     gymAddress:
  //       "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
  //     gymCoNum: "110-203-10232",

  //     gymTime:
  //       "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "/trainer/trainer (1).jpg",
  //     trainerIntro: "강사 박00 입니다.",
  //     gym1DayPrice: "20000원",
  //     gym3DayPrice: "30000원",
  //     gym7DayPrice: "50000원",
  //     gymMonthPrice: "20000원",
  //     gym3MonthPrice: "200000원",
  //     gym6MonthPrice: "400000원",
  //     gymYearPrice: "800000원",
  //   },
  // ];

  // const trainers = [
  //   {
  //     //      albumId: 1,
  //     id: 39,
  //     gymCode: "110-203-102300",
  //     trainerName: "박00",
  //     trainerPhotoUrl: "/trainer/trainer (1).jpg",
  //     trainerIntro: "강사 박00 입니다.",
  //     trainerSpecial: "근력운동",
  //     pt1TimePrice: "10,000원",
  //     pt10TimePrice: "20,000원",
  //     pt30TimePrice: "30,000원",
  //     pilates1TimePrice: "10,000원",
  //     pilates10TimePrice: "10,000원",
  //     pilates30TimePrice: "10,000원",
  //     yoga1TimePrice: "10,000원",
  //     yoga10TimePrice: "10,000원",
  //     yoga30TimePrice: "10,000원",
  //     gym1DayPrice: "10,000원",
  //     gym3DayPrice: "10,000원",
  //     gym7DayPrice: "10,000원",
  //     gymMonthPrice: "10,000원",
  //     gym3MonthPrice: "10,000원",
  //     gym6MonthPrice: "10,000원",
  //     gymYearPrice: "10,000원",
  //   },
  //   {
  //     //      albumId: 1,
  //     id: 38,
  //     gymCode: "110-203-102300",
  //     trainerName: "윤00",
  //     trainerPhotoUrl: "/trainer/trainer (2).jpg",
  //     trainerIntro: "강사 윤00 입니다.",
  //     trainerSpecial: "하체운동",
  //     pt1TimePrice: "10,000원",
  //     pt10TimePrice: "20,000원",
  //     pt30TimePrice: "30,000원",
  //     pilates1TimePrice: "10,000원",
  //     pilates10TimePrice: "10,000원",
  //     pilates30TimePrice: "10,000원",
  //     yoga1TimePrice: "10,000원",
  //     yoga10TimePrice: "10,000원",
  //     yoga30TimePrice: "10,000원",
  //     gym1DayPrice: "10,000원",
  //     gym3DayPrice: "10,000원",
  //     gym7DayPrice: "10,000원",
  //     gymMonthPrice: "10,000원",
  //     gym3MonthPrice: "10,000원",
  //     gym6MonthPrice: "10,000원",
  //     gymYearPrice: "10,000원",
  //   },
  // ];

  // const gymDetail = gymDetail.find((item) => item.id === +id);

  return { props: { gymDetail, trainers } };
};

export default GymDetail;