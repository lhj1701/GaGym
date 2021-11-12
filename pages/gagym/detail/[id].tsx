import React from "react";
import Image from "next/image";
import styles from "../../../styles/Gymdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import { useRouter } from "next/router";

import { GetServerSideProps } from "next";

// import gymDetails from "../../../provider/modules/gymDetail";

interface GymDetail {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  gymName: string;
  gymAddress: string;
  gymCoNum: number;
  gymTime: string;
  trainerName: string;
  trainerPhotoUrl: string;
  trainerIntro: string;
  trainerSpecial: string;
  // gymPrice: GymPrice[];

  pt1TimePrice: string;
  pt10TimePrice: string;
  pt30TimePrice: string;
  pilates1TimePrice: string;
  pilates10TimePrice: string;
  pilates30TimePrice: string;
  yoga1TimePrice: string;
  yoga10TimePrice: string;
  yoga30TimePrice: string;
  gym1DayPrice: string;
  gym3DayPrice: string;
  gym7DayPrice: string;
  gymMonthPrice: string;
  gym3MonthPrice: string;
  gym6MonthPrice: string;
  gymYearPrice: string;

  gymPhotoUrl: string;
  gymService: string;
  gymNotice: string;
}

// export interface GymPrice {
//   gym1DayPrice: string;
//   gym3DayPrice: string;
//   gym7DayPrice: string;
//   gymMonthPrice: string;
//   gym3MonthPrice: string;
//   gym6MonthPrice: string;
//   gymYearPrice: string;

//   pt1TimePrice: string;
//   pt10TimePrice: string;
//   pt30TimePrice: string;
//   pilates1TimePrice: string;
//   pilates10TimePrice: string;
//   pilates30TimePrice: string;
//   yoga1TimePrice: string;
//   yoga10TimePrice: string;
//   yoga30TimePrice: string;
// }

interface gymDetailProp {
  gymDetail: GymDetail;
}

const GymDetail = ({ gymDetail }: gymDetailProp) => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <div className={styles.container}>
      <AppBar />
      <main className={styles.main} key={`${gymDetail.id}`}>
        <div className={styles.div}>
          {/* 1. 헬스장 사진 + 내용 + 예약버튼 */}
          <div className="d-flex mt-5">
            {/* 사진 */}
            <div style={{ cursor: "pointer" }} className={styles.src}>
              <Image
                src={gymDetail.thumbnailUrl}
                // className="card-img-top"
                alt={gymDetail.gymName}
                /* 이미지 크기에 맞게 가운데부분 노출 */
                // layout="responsive"
                objectFit="cover" //써야됨 or none
                /* ------------------------------- */
                width={300}
                height={300}
              />
            </div>
            {/* 내용 */}
            {/* <div style={{ width: "520px" }}> */}
            <div style={{ width: "auto", height: "300px" }}>
              {/* 헬스장명 */}
              <h3>{gymDetail.gymName}</h3>
              {/* 헬스장주소 */}
              <h6>{gymDetail.gymAddress}</h6>
              {/* 헬스장 전화번호 */}
              <h6>{gymDetail.gymCoNum}</h6>
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
          {/*임시시작*/}
          <div>
            <div className={styles.div2}>
              <div className={styles.divp}>
                <img src={gymDetail.trainerPhotoUrl} className={styles.img} />
                <h5 className="mx-4 mt-2">{gymDetail.trainerName}</h5>
              </div>
              <div className={styles.divp}>
                <img src={gymDetail.trainerPhotoUrl} className={styles.img} />
                <h5 className="mx-4 mt-2">{gymDetail.trainerName}</h5>
              </div>
              <div className={styles.divp}>
                <img src={gymDetail.trainerPhotoUrl} className={styles.img} />
                <h5 className="mx-4 mt-2">{gymDetail.trainerName}</h5>
              </div>
            </div>
          </div>
          {/*임시끝*/}

          {/*강사소개+이용권*/}
          <div className="d-flex mt-5 align-items-center">
            {/*(왼쪽)강사소개*/}
            <div className="mx-5">
              <img src={gymDetail.trainerPhotoUrl} className={styles.imgd} />
              <div className={styles.divsp}>
                <span>{gymDetail.trainerName}</span>
                <br />
                <span>{gymDetail.trainerIntro}</span>
                <br />
                <span>{gymDetail.trainerSpecial}</span>
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
                  <td className={styles.td1}>{gymDetail.pt1TimePrice}</td>
                  <td className={styles.td1}>{gymDetail.pt10TimePrice}</td>
                  <td className={styles.td1}>{gymDetail.pt30TimePrice}</td>
                </tr>
                <tr>
                  <td className={styles.td1c}>필라테스</td>
                  <td className={styles.td1}>{gymDetail.pilates1TimePrice}</td>
                  <td className={styles.td1}>{gymDetail.pilates10TimePrice}</td>
                  <td className={styles.td1}>{gymDetail.pilates30TimePrice}</td>
                </tr>
                <tr>
                  <td className={styles.td1c}>요가</td>
                  <td className={styles.td1}>{gymDetail.yoga1TimePrice}</td>
                  <td className={styles.td1}>{gymDetail.yoga10TimePrice}</td>
                  <td className={styles.td1}>{gymDetail.yoga30TimePrice}</td>
                </tr>
              </table>
            </div>
          </div>

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

          {/*------임시끝*/}

          {/* 헬스장 사진 */}
          <h4 className={styles.h4}>헬스장 사진</h4>

          <div className="mt-3">
            <img
              src={gymDetail.gymPhotoUrl}
              style={{ width: "150px" }}
              className="border border-light"
            ></img>
            {/*
              <img
                src="/gymimg/1 (1).jpg"
                style={{ width: "150px" }}
                className="border border-light"
              />
              <img
                src="/gymimg/1 (2).jpg"
                style={{ width: "150px" }}
                className="border border-light"
              />
              <img
                src="/gymimg/1 (3).jpg"
                style={{ width: "150px" }}
                className="border border-light"
              />
              <img
                src="/gymimg/1 (4).jpg"
                style={{ width: "150px" }}
                className="border border-light"
              />
              */}
          </div>
          {/* 부가서비스 */}
          <h4 className={styles.h4}>부가서비스</h4>
          <div className="mb-5">{gymDetail.gymService}</div>

          {/*강사소개/이용권/헬스장사진/부가서비스/공지사항 끝*/}

          {/* 1/2 끝 */}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  //  Fetch data from external API
  // const res = await axios.get<GymPhoto[]>(
  //   `http://localhost:3000/gagym/gagym-list/${id}`
  // );
  // const gymDetail = res.data;

  const gymDetails = [
    {
      albumId: 1,
      id: 1,
      gymName: "강남 화이트짐",
      thumbnailUrl: "/gymimg/1 (1).jpg",
      gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "/trainer/trainer (1).jpg",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],

      pt1TimePrice: "10,000원",
      pt10TimePrice: "20,000원",
      pt30TimePrice: "30,000원",
      pilates1TimePrice: "10,000원",
      pilates10TimePrice: "10,000원",
      pilates30TimePrice: "10,000원",
      yoga1TimePrice: "10,000원",
      yoga10TimePrice: "10,000원",
      yoga30TimePrice: "10,000원",
      gym1DayPrice: "10,000원",
      gym3DayPrice: "10,000원",
      gym7DayPrice: "10,000원",
      gymMonthPrice: "10,000원",
      gym3MonthPrice: "10,000원",
      gym6MonthPrice: "10,000원",
      gymYearPrice: "10,000원",
    },
    {
      albumId: 1,
      id: 2,
      gymName: "논현 REGENT 프라이빗짐",
      thumbnailUrl: "/gymimg/2 (1).jpg",
      gymAddress:
        "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 3,
      gymName: "대치 로그짐",
      thumbnailUrl: "/gymimg/3 (1).jpg",
      gymAddress: "서울특별시 강남구 삼성로 317, 우석빌딩 지하2 로그짐 대치점",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 4,
      gymName: "대치 휘트니스G",
      thumbnailUrl: "/gymimg/4 (1).jpg",
      gymAddress: "서울 강남구 역삼로 542 신사에스엔지 지하 1층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 5,
      gymName: "선릉 바디스페이스",
      thumbnailUrl: "/gymimg/5 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로 311 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 6,
      gymName: "선릉 보리스짐",
      thumbnailUrl: "/gymimg/6 (1).jpg",
      gymAddress: "서울특별시 강남구 선릉로94길 7 현죽빌딩 지하 1층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 7,
      gymName: "압구정 로그짐",
      thumbnailUrl: "/gymimg/7 (1).jpg",
      gymAddress: "서울특별시 강남구 압구정로28길 40, 5층 로그짐",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 8,
      gymName: "언주 아트짐 토탈휘트니스",
      thumbnailUrl: "/gymimg/8 (1).jpg",
      gymAddress: "서울특별시 강남구 논현로 626, 엠빌딩 지하2층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 9,
      gymName: "역삼 F&G휘트니스",
      thumbnailUrl: "/gymimg/9 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로25길 7 창성재단빌딩 지하 1, 2층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
    {
      albumId: 1,
      id: 10,
      gymName: "청담 리발란스K",
      thumbnailUrl: "/gymimg/10 (1).jpg",
      gymAddress: "서울특별시 강남구 학동로97길 20 튼튼병원 별관 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime:
        "[평 일] 06:00 ~ 21:30 \n [토요일] 08:00 ~ 18:00 \n [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
    },
  ];

  const gymDetail = gymDetails.find((item) => item.id === +id);

  return { props: { gymDetail } };
};

export default GymDetail;
