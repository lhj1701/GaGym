import Link from "next/link";
import styles from "../styles/Appbar.module.css";
import { useRouter } from "next/router";
import { Navbar, Container, Nav } from "react-bootstrap";

const AppBar = () => {
  const router = useRouter();
  return (
    <div>
      <Navbar className={styles.appbar} expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/" passHref>
              <img style={{ width: "100px" }} src="/logo.png" alt="logo" />
            </Link>
          </Navbar.Brand>
          <div className="d-flex justify-content-end align-items-center">
            <Nav>
              <Nav.Link>
                <Link href="/" passHref>
                  <a className="text-dark mx-1">HOME</a>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link href="/home/select">
                  <a className="text-dark mx-1">헬스장찾기</a>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link href="/mypage/mypage">
                  <a className="text-dark mx-1">마이페이지</a>
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link href="/mypage/diary/diary-list">
                  <a className="text-dark mx-1">PT일지</a>
                </Link>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppBar;
