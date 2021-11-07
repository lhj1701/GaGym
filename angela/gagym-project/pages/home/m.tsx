import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeLogo from "../../components/homelogo";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const m = ({ home }: HomeProp) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <HomeLogo />
        <button type="button" className="btn btn-dark mt-3">
          회원
        </button>
        <div className="mt-4 row-vh d-flex flex-column align-items-center">
          <button
            type="button"
            className="btn btn-outline-dark"
            // style={{ width: "130px" }}
            onClick={() => {
              router.push(`/home/select`);
            }}
          >
            헬스장 찾기
          </button>
          <button
            type="button"
            className="btn btn-outline-dark mt-1"
            onClick={() => {
              router.push(`/home/login`);
            }}
          >
            내 예약 및 PT일지 관리
          </button>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

// 여기 함수부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/homes/1");

  const home: Home = await res.json();

  // 여기에 prop: {속성객체}

  // 속성객체를 컴포넌트의 속성을 넣어줌

  return { props: { home } };
}

export default m;
