import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/contact/Contactcreate.module.css";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import AppBar from "../../components/appbar";

import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination";
import { AppDispatch, RootState } from "../../provider";
import {
  requestFetchContacts,
  requestFetchPagingContacts,
} from "../../middleware/modules/contact";

import { useEffect, useRef } from "react";
import { ContactItem } from "../../provider/modules/contact";
//import { addContact } from "./contactSlice";

import { requestAddContact } from "../../middleware/modules/contact";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const contactCreate = ({ home }: HomeProp) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  //    const inputRef = useRef<HTMLInputElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);

  const contactData = useSelector((state: RootState) => state.contact.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.contact.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);
    // true이면 화면이동

    //------------여기 경로 다시확인15:42
    isAddCompleted && router.push("/contact/contact-list");
  }, [isAddCompleted, router, dispatch]);

  const handleSaveClick = () => {
    const item: ContactItem = {
      id: contactData.length > 0 ? contactData[0].id + 1 : 1,
      select: selectRef.current?.value,
      txtName: inputRef1.current?.value,
      txtContact: inputRef2.current?.value,
      txtEmail: inputRef3.current?.value,
      memo: memo.current?.value,
      createdTime: new Date().getTime(),
    };
    dispatch(requestAddContact(item));
    // dispatch(addContact(item));
    router.push("/contact/contact-list");

    /* 윗줄 추가하고 잠깐 임시로
// ----- 기존 redux action -----
dispatch(addContact(item));
        router.push("/contacts");
*/
    // formRef.current?.reset();
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Contact Create 📃</h2>
      <form className="mx-auto">
        <table className="table">
          <tbody>
            <tr>
              <th>성별</th>
              <td>
                <select className="py-1" ref={selectRef}>
                  <option value="👨🏻‍💼">👨🏻‍💼</option>
                  <option value="👩🏻‍💼">👩🏻‍💼</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>
                {" "}
                <input
                  type="text"
                  className="form-control"
                  placeholder="이름"
                  ref={inputRef1}
                />
              </td>
            </tr>

            <tr>
              <th>전화번호</th>
              <td>
                {" "}
                <input
                  type="tel"
                  className="form-control"
                  placeholder="전화번호"
                  ref={inputRef2}
                />
              </td>
            </tr>

            <tr>
              <th>이메일</th>
              <td>
                {" "}
                <input
                  type="email"
                  className="form-control"
                  placeholder="이메일"
                  ref={inputRef3}
                />
              </td>
            </tr>

            <tr>
              <th>메모</th>
              <td>
                {" "}
                <textarea
                  className="form-control"
                  placeholder="메모"
                  style={{ height: "40vh" }}
                  ref={memo}
                />
              </td>
            </tr>
          </tbody>
        </table>
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
          className="btn btn-dark float-end btn-sm p-2"
          onClick={() => {
            handleSaveClick();
          }}
        >
          <i className="bi bi-save me-1"></i>
          저장
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

export default contactCreate;
