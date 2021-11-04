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
//import { ContactItem } from "./contactSlice";
//import { modifyContact } from "./contactSlice";

import { requestModifyContact } from "../../../middleware/modules/contact";

interface HomeProp {
  home: Home;
}

interface Home {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const diaryEdit = ({ home }: HomeProp) => {
  const router = useRouter();

  const id = router.query.id as string;

  const ContactItem = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.contact.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const memo = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log("--isEditcompleted 변경: ");

    //------------여기 경로 다시확인15:42
    isModifyCompleted && router.push("/contact/contact-list");
  }, [isModifyCompleted, router]);

  // ------ 이벤트에 대해서 처리하는 부분 --------
  const handleSaveClick = () => {
    if (ContactItem) {
      const item = { ...ContactItem };
      item.select = selectRef.current?.value;
      item.txtName = inputRef1.current?.value;
      item.txtContact = inputRef2.current?.value;
      item.txtEmail = inputRef3.current?.value;
      item.memo = memo.current?.value;

      dispatch(requestModifyContact(item));
      //dispatch(modifyContact(item));
      router.push("/contact/contact-list");
    }
  };

  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center my-4 mb-5">Contact Edit ✍🏻</h2>
      <form className="mx-auto">
        <table className="table">
          <tbody>
            <tr>
              <th>성별</th>
              <td className="text-center">
                <select
                  className="py-1 d-flex"
                  ref={selectRef}
                  defaultValue={ContactItem?.select}
                >
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
                  placeholder="이름을 수정합니다."
                  defaultValue={ContactItem?.txtName}
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
                  placeholder="전화번호를 수정합니다."
                  defaultValue={ContactItem?.txtContact}
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
                  placeholder="이메일을 수정합니다."
                  defaultValue={ContactItem?.txtEmail}
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
                  placeholder="메모를 수정합니다."
                  defaultValue={ContactItem?.memo}
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
          className="btn btn-light border border-2 btn-sm p-2  float-start"
          onClick={() => {
            router.push("/contact/contact-list");
          }}
        >
          <i className="bi bi-list me-1"></i>
          목록
        </button>
        <button
          className="btn btn-dark btn-sm p-2  float-end"
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

export default diaryEdit;
