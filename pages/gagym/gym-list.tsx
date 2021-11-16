import React from "react";
import Image from "next/image";
import styles from "../../styles/Gymlist.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";
import { useRouter } from "next/router";

interface GymPhoto {
  albumId: number;
  id: number;
  gymName: string;
  gymAddress: string;
  url: string;
  thumbnailUrl: string;
}

interface gymListProp {
  gymList: GymPhoto[];
}

const GymList = ({ gymList }: gymListProp) => {
  const router = useRouter();

  return (
    <div>
      <AppBar />
      <main className="d-flex flex-wrap">
        <div
          className="d-flex align-items-center"
          style={{ margin: "20px 0 40px 100px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          서울특별시 강남구
        </div>
        {/* 리스트 시작 */}
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
                  width: "calc((100% - 3rem) / 5)",
                }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/gagym/detail/${item.id}`);
                  }}
                >
                  <Image
                    src={item.thumbnailUrl}
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
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export async function getServerSideProps() {
  // const res = await axios.get<GymPhoto[]>(
  //   "https://jsonplaceholder.typicode.com/gymList?_start=0&_limit=8"
  // );
  // const gymList = res.data;

  const gymList = [
    {
      albumId: 1,
      id: 1,
      gymName: "강남 화이트짐",
      thumbnailUrl: "/gymimg/1 (1).jpg",
      gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
    },
    {
      albumId: 1,
      id: 2,
      gymName: "논현 REGENT 프라이빗짐",
      thumbnailUrl: "/gymimg/2 (1).jpg",
      gymAddress:
        "서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
    },
    {
      albumId: 1,
      id: 3,
      gymName: "대치 로그짐",
      thumbnailUrl: "/gymimg/3 (1).jpg",
      gymAddress: "서울특별시 강남구 삼성로 317, 우석빌딩 지하2 로그짐 대치점",
    },
    {
      albumId: 1,
      id: 4,
      gymName: "대치 휘트니스G",
      thumbnailUrl: "/gymimg/4 (1).jpg",
      gymAddress: "서울 강남구 역삼로 542 신사에스엔지 지하 1층",
    },
    {
      albumId: 1,
      id: 5,
      gymName: "선릉 바디스페이스",
      thumbnailUrl: "/gymimg/5 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로 311 지하1층",
    },
    {
      albumId: 1,
      id: 6,
      gymName: "선릉 보리스짐",
      thumbnailUrl: "/gymimg/6 (1).jpg",
      gymAddress: "서울특별시 강남구 선릉로94길 7 현죽빌딩 지하 1층",
    },
    {
      albumId: 1,
      id: 7,
      gymName: "압구정 로그짐",
      thumbnailUrl: "/gymimg/7 (1).jpg",
      gymAddress: "서울특별시 강남구 압구정로28길 40, 5층 로그짐",
    },
    {
      albumId: 1,
      id: 8,
      gymName: "언주 아트짐 토탈휘트니스",
      thumbnailUrl: "/gymimg/8 (1).jpg",
      gymAddress: "서울특별시 강남구 논현로 626, 엠빌딩 지하2층",
    },
    {
      albumId: 1,
      id: 9,
      gymName: "역삼 F&G휘트니스",
      thumbnailUrl: "/gymimg/9 (1).jpg",
      gymAddress: "서울특별시 강남구 테헤란로25길 7 창성재단빌딩 지하 1, 2층",
    },
    {
      albumId: 1,
      id: 10,
      gymName: "청담 리발란스K",
      thumbnailUrl: "/gymimg/10 (1).jpg",
      gymAddress: "서울특별시 강남구 학동로97길 20 튼튼병원 별관 지하1층",
    },
  ];
  return { props: { gymList } };
}

export default GymList;
