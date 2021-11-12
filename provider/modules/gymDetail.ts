import { GetServerSideProps } from "next";
import gymDetailProp from "../../pages/gagym/detail/[id]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
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
      yoga10TimePrice: "",
      yoga30TimePrice: "",
      //--임시
      /*
      const gymDetail = [
  {
    albumId: 1,
    id: 1,
    trainerName: 박00,
    trainerPhotoUrl: /people.jpg,
    gymAddress: "서울특별시 강남구 도곡로3길 19, 서희스타힐스 지하1층",
  },
];

 <div className="d-flex align-items-center mt-3">
            <img src="/people.jpg" className={styles.img} />
            {gymDetail.trainerPhotoUrl}
            <div></div>
    
      */
      // gymPriceItem : gymPrice[],
      /*
        gym1DayPrice: "",
        gym3DayPrice: "",
        gym7DayPrice: "",
        gymMonthPrice: "",
        gym3MonthPrice: "",
        gym6MonthPrice: "",
        gymYearPrice: ""
   */
      // trainerPriceItem : personalPrice[],
      /*
      pt1TimePrice: "",
      pt10TimePrice: "",
      pt30TimePrice: "",
      pilates1TimePrice: "",
      pilates10TimePrice: "",
      pilates30TimePrice: "",
      yoga1TimePrice: "",
      yoga10TimePrice: "",
      yoga30TimePrice: "",
  */
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
}
export default gymDetailProp;

