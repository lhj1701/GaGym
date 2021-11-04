import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Contactcreate.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../../components/appbar";

//import { useParams } from "react-router-dom";

import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { requestRemoveContact } from "../../../middleware/modules/contact";
import { requestModifyContact } from "../../../middleware/modules/contact";
import { ContactItem } from "../../../provider/modules/contact";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const contactDetail = ({ home }: HomeProp) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  let contactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.contact.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/contact/contact-list");
  }, [isRemoveCompleted, router]);

  const handleAddClick = () => {
    dispatch(requestRemoveContact(+id));
    router.push("/contact/contact-list");
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Contact Detail 📃</h2>
      <form className="mx-auto">
        {contactItem && (
          <table className="table">
            <tbody>
              <tr>
                <th>성별</th>
                <td>{contactItem.select}</td>
              </tr>
              <tr>
                <th>이름</th>
                <td>{contactItem.txtName}</td>
              </tr>

              <tr>
                <th>전화번호</th>
                <td>{contactItem.txtContact}</td>
              </tr>

              <tr>
                <th>이메일</th>
                <td>{contactItem.txtEmail}</td>
              </tr>

              <tr>
                <th>메모</th>
                <td>{contactItem.memo}</td>
              </tr>
            </tbody>
          </table>
        )}
      </form>

      <div className="mt-3">
        <button
          className="btn btn-light border border-2 btn-sm p-2 float-start"
          onClick={() => {
            router.push("/contact/contact-list");
          }}
        >
          <i className="bi bi-list me-1"></i>
          목록
        </button>
        <button
          className="btn btn-dark btn-sm p-2 float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-trash me-1"></i>
          삭제
        </button>

        <button
          className="btn btn-warning btn-sm p-2 float-end me-1"
          onClick={() => {
            router.push(`/contact/edit/${id}`);
          }}
        >
          <i className="bi bi-pencil-square me-1"></i>
          <b>수정</b>
        </button>
      </div>
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

export default contactDetail;
