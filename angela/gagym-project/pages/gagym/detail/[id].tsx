import React from "react";
import Image from "next/image";
import styles from "../../../styles/Gymdetail.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";
import { useRouter } from "next/router";

import { GetServerSideProps } from "next";

import axios from "axios";

interface GymPhoto {
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
  // gymPrice: gymPrice[];
  gymPhotoUrl: string;
  gymService: string;
  // gymService: gymserviceList[];
  gymNotice: string;
}

interface gymDetailProp {
  gymDetail: GymPhoto;
}

const gymDetail = ({ gymDetail }: gymDetailProp) => {
  const router = useRouter();

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
            <div style={{ width: "520px" }}>
              {/* 헬스장명 */}
              <h3>{gymDetail.gymName}</h3>
              {/* 헬스장주소 */}
              <h6>{gymDetail.gymAddress}</h6>
              {/* 헬스장 전화번호 */}
              <h6>{gymDetail.gymCoNum}</h6>
              {/* 헬스장 운영시간 */}
              <p className={styles.p}>
                [운영시간]
                <br />
                {gymDetail.gymTime}
              </p>
              {/* 예약버튼 */}
              <button
                type="button"
                className="btn btn-outline-dark btn-lg mt-4"
                style={{ width: "400px" }}
                onClick={() => {
                  router.push(`/reservation`);
                }}
              >
                예약하러 가기
              </button>
            </div>
          </div>
          {/* 2. 강사소개/이용권/헬스장사진/부가서비스/공지사항 시작 */}
          {/* 강사소개 */}
          <h3 className={styles.h3}>강사소개</h3>
          <div className="d-flex align-items-center mt-3">
            <img src="/people.jpg" className={styles.img} />
            {gymDetail.trainerPhotoUrl}
            <div>
              <p className="d-flex mb-1">
                {/* 강사이름 */}
                <u>강사이름</u>
              </p>
              <p>{gymDetail.trainerName}</p>
              <p className="d-flex mb-1">
                {/* 강사 한줄 소개 */}
                <u>강사 한줄 소개</u>
              </p>
              <p>{gymDetail.trainerIntro}</p>
              <p className="d-flex mb-1">
                {/* 전문분야 */}
                <u>전문분야</u>
              </p>
              <p>{gymDetail.trainerSpecial}</p>
            </div>
          </div>
          {/* 이용권 */}
          <h3 className={styles.h3}>이용권</h3>
          {/*--P.T--*/}
          <div>
            <p className="d-flex justify-content-center mt-3">
              <u>P.T</u>
            </p>
            <button type="button" className={styles.btn}>
              1회
            </button>
            <button type="button" className={styles.btn}>
              10회
            </button>
            <button type="button" className={styles.btn}>
              30회
            </button>
          </div>
          {/*--헬스--*/}
          <div>
            <p className="d-flex justify-content-center mt-5">
              <u>헬스</u>
            </p>
            <button type="button" className={styles.btn}>
              1개월
            </button>
            <button type="button" className={styles.btn}>
              3개월
            </button>
            <button type="button" className={styles.btn}>
              6개월
            </button>
            <button type="button" className={styles.btn}>
              12개월
            </button>
          </div>
          {/*--필라테스--*/}
          <div>
            <p className="d-flex justify-content-center mt-5">
              <u>필라테스</u>
            </p>
            <button type="button" className={styles.btn}>
              1개월
            </button>
            <button type="button" className={styles.btn}>
              3개월
            </button>
            <button type="button" className={styles.btn}>
              6개월
            </button>
            <button type="button" className={styles.btn}>
              12개월
            </button>
          </div>
          {/*--요가--*/}
          <div>
            <p className="d-flex justify-content-center mt-5">
              <u>요가</u>
            </p>
            <button type="button" className={styles.btn}>
              1개월
            </button>
            <button type="button" className={styles.btn}>
              3개월
            </button>
            <button type="button" className={styles.btn}>
              6개월
            </button>
            <button type="button" className={styles.btn}>
              12개월
            </button>
          </div>
          {/* 헬스장 사진 */}
          <h3 className={styles.h3}>헬스장 사진</h3>

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
          <h3 className={styles.h3}>부가서비스</h3>
          <div>{gymDetail.gymService}</div>
          {/* 공지사항 */}
          <h3 className={styles.h3}>공지사항</h3>
          <div className="mb-5">{gymDetail.gymNotice}</div>

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
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 2,
      gymName: "논현 REGENT 프라이빗짐",
      thumbnailUrl: "/gymimg/2 (1).jpg",
      gymAddress:
        "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 3,
      gymName: "대치 로그짐",
      thumbnailUrl: "/gymimg/3 (1).jpg",
      gymAddress: "서울특별시 강남구 삼성로 317, 우석빌딩 지하2 로그짐 대치점",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 4,
      gymName: "대치 휘트니스G",
      thumbnailUrl: "/gymimg/4 (1).jpg",
      gymAddress: "서울 강남구 역삼로 542 신사에스엔지 지하 1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 5,
      gymName: "선릉 바디스페이스",
      thumbnailUrl: "/gymimg/5 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로 311 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 6,
      gymName: "선릉 보리스짐",
      thumbnailUrl: "/gymimg/6 (1).jpg",
      gymAddress: "서울특별시 강남구 선릉로94길 7 현죽빌딩 지하 1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 7,
      gymName: "압구정 로그짐",
      thumbnailUrl: "/gymimg/7 (1).jpg",
      gymAddress: "서울특별시 강남구 압구정로28길 40, 5층 로그짐",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 8,
      gymName: "언주 아트짐 토탈휘트니스",
      thumbnailUrl: "/gymimg/8 (1).jpg",
      gymAddress: "서울특별시 강남구 논현로 626, 엠빌딩 지하2층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 9,
      gymName: "역삼 F&G휘트니스",
      thumbnailUrl: "/gymimg/9 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로25길 7 창성재단빌딩 지하 1, 2층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
    {
      albumId: 1,
      id: 10,
      gymName: "청담 리발란스K",
      thumbnailUrl: "/gymimg/10 (1).jpg",
      gymAddress: "서울특별시 강남구 학동로97길 20 튼튼병원 별관 지하1층",
      gymCoNum: "0504-3172-6899",
      gymTime: "[평 일] 06:00 ~ 21:30 [토요일] 08:00 ~ 18:00 [휴관일] 공휴일",
      trainerName: "박00",
      trainerPhotoUrl: "",
      trainerIntro: "강사 박00 입니다.",
      trainerSpecial: "근력운동",
      // gymPrice : gymPrice[],
      gymPhotoUrl: "/gymimg/1 (1).jpg",
      // gymService : gymserviceList[],
      gymNotice: "공지사항 입니다.",
    },
  ];

  const gymDetail = gymDetails.find((item) => item.id === +id);

  return { props: { gymDetail } };
};

export default gymDetail;
