/*
import { DiaryItem } from "../../provider/modules/diary";
*/


export async function getServerSideProps() {
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
gymAddress:"서울특별시 강남구 논현로119길 23, 준미빌딩 B1 리젠트프라이빗짐",
      
    },
    {
      albumId: 1,
      id: 3,
      gymName: "대치 로그짐",
      thumbnailUrl: "/gymimg/3 (1).jpg",
gymAddress:"서울특별시 강남구 삼성로 317, 우석빌딩 지하2 로그짐 대치점",
    },
    {
      albumId: 1,
      id: 4,
      gymName: "대치 휘트니스G",
      thumbnailUrl: "/gymimg/4 (1).jpg",
gymAddress:"서울 강남구 역삼로 542 신사에스엔지 지하 1층",
    },
    {
      albumId: 1,
      id: 5,
      gymName: "선릉 바디스페이스",
      thumbnailUrl: "/gymimg/5 (1).jpg",
gymAddress:"서울특별시 강남구 테헤란로 311 지하1층",
    },
    {
      albumId: 1,
      id: 6,
      gymName: "선릉 보리스짐",
      thumbnailUrl: "/gymimg/6 (1).jpg",
gymAddress:"서울특별시 강남구 선릉로94길 7 현죽빌딩 지하 1층",
    },
    {
      albumId: 1,
      id: 7,
      gymName: "압구정 로그짐",
      thumbnailUrl: "/gymimg/7 (1).jpg",
gymAddress:"서울특별시 강남구 압구정로28길 40, 5층 로그짐",
    },
    {
      albumId: 1,
      id: 8,
      gymName: "언주 아트짐 토탈휘트니스",
      thumbnailUrl: "/gymimg/8 (1).jpg",
gymAddress:"서울특별시 강남구 논현로 626, 엠빌딩 지하2층",
  },
        {
      albumId: 1,
      id: 9,
      gymName: "역삼 F&G휘트니스",
     thumbnailUrl: "/gymimg/9 (1).jpg",
gymAddress:"서울특별시 강남구 테헤란로25길 7 창성재단빌딩 지하 1, 2층",
  },
  {
      albumId: 1,
      id: 10,
      gymName: "청담 리발란스K",
      thumbnailUrl: "/gymimg/10 (1).jpg",
gymAddress:"서울특별시 강남구 학동로97길 20 튼튼병원 별관 지하1층",
    },
  ];

    return { props: { gymList } };
}