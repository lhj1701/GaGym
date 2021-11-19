import React from "react";
import Image from "next/image";
import styles from "../../styles/Gymlist.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import { useRouter } from "next/router";

import axios from "axios";

import Link from "next/link";

interface GymDetail {
  albumId: number;
  // 11/17 변경
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

interface gymListProp {
  gymList: GymDetail[];
}

const GymList = ({ gymList }: gymListProp) => {
  const router = useRouter();

  return (
    <div>
      {/* <Layout> */}
      <AppBar />
      {/* <main className="d-flex flex-wrap"> */}
      <div className={styles.svg1} style={{ margin: "30px 0 20px 120px" }}>
        <div className={styles.svg11}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            // className="bi bi-geo-alt mx-2"
            className={styles.svg111}
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <span className={styles.svg111}>
            <Link href="/home/select" passHref>
              <a className={styles.svg1111}>서울특별시 강남구</a>
            </Link>
          </span>
        </div>
<<<<<<< HEAD
        {/* 헬스장 mapping 시작 */}
        <div>
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ margin: "40px 0 0 0" }}
          >
            {gymList.map((item, index) => (
=======
      </div>
      {/* 헬스장 mapping 시작 */}
      <div>
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ margin: "40px 0 0 0" }}
        >
          {gymList.map((item, index) => (
            <div
              key={`photo-item-${index}`}
              // className="card"
              className={styles.div}
              style={{
                boxShadow: "0 2px 5px 0",
                width: "calc((100% - 10rem) / 5)", //3rem
              }}
            >
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`/gagym/detail/${item.id}`);
                }}
              >
<<<<<<< HEAD
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/gagym/detail/${item.id}`);
                  }}
                >
                  {/* 11/17 사진-희균님 데이터 받아오기 전까지 잠시 주석*/}
                  <Image
                    // src={item.gymPhoto}
                    src={"/gymimg/1 (1).jpg"} //1118임시
                    alt={item.gymName}
                    layout="responsive"
                    objectFit="cover" //써야됨 or none
                    width={100}
                    height={100}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.gymName}</h5>
                    <h6 className="card-title">{item.gymAddress}</h6>
                  </div>
=======
                {/* 11/17 사진-희균님 데이터 받아오기 전까지 잠시 주석*/}
                <Image
                  // src={item.gymPhoto}
                  src={"/gymimg/1 (1).jpg"} //1118임시
                  alt={item.gymName}
                  layout="responsive"
                  objectFit="cover" //써야됨 or none
                  width={100}
                  height={100}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.gymName}</h5>
                  <h6 className="card-title">{item.gymAddress}</h6>
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 페이지네이션 작업중 */}
        {/*페이지네이션 시작
        <div>
          <button onClick={() => Router.push(`/?page=${this.props.page - 1}`)}>
            PREV
          </button>
          <button onClick={() => Router.push(`/?page=${this.props.page + 1}`)}>
            NEXT
          </button>
        </div>
        
        페이지네이션 끝*/}
<<<<<<< HEAD
        </div>
        {/* 헬스장 mapping 끝 */}
      </main>
      <footer className={styles.footer}></footer>
=======
      </div>
      {/* 헬스장 mapping 끝 */}
      {/* </main> */}
      {/* </Layout> */}
      <Footer />
>>>>>>> 92d191e2b0c953ac99ff60bd9e03680a115f944b
    </div>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<GymDetail[]>(
    "http://localhost:8080/gagym/gym-list"
  );
  const gymList = res.data;

  // 11/17 더미데이터 주석처리
  // const gymList = [
  //   {
  //     // albumId: 1,
  //     id: 1,
  //     gymName: "강남 화이트짐",
  //     gymPhoto: "/gymimg/1 (1).jpg",
  //     gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
  //   },
  //   {
  //     // albumId: 1,
  //     id: 2,
  //     gymName: "논현 REGENT 프라이빗짐",
  //     gymPhoto: "/gymimg/2 (1).jpg",
  //     gymAddress:
  //       "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
  //   }
  // ];
  return { props: { gymList } };
}

export default GymList;