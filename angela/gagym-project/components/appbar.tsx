import React from "react";

import { auto } from "@popperjs/core";
import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/Appbar.module.css";
import { useRouter } from "next/router";

const AppBar = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar className={styles.appbar} expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/">
              <img style={{ width: "100px" }} src="/logo.png" alt="logo" />
            </Link>
          </Navbar.Brand>
          <div
            className="d-flex justify-content-end"
            style={{ fontSize: "19px" }}
          >
            {/*appbar안에 메뉴*/}
            <Nav>
              <Nav.Item className="me-3">
                <Link href="/">
                  <a className="text-dark">HOME</a>
                </Link>
              </Nav.Item>
              <Nav.Item className="me-3">
                <Link href="/home/select">
                  <a className="text-dark">헬스장찾기</a>
                </Link>
              </Nav.Item>
              <Nav.Item className="me-3">
                <Link href="/mypage/mypage">
                  <a className="text-dark">마이페이지</a>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link href="/mypage/diary/diary-list">
                  <a className="text-dark">PT일지</a>
                </Link>
              </Nav.Item>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppBar;
