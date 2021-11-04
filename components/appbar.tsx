import Link from "next/link";
import styles from "./layout.module.css";

import { Navbar, Container, Nav } from "react-bootstrap";

const AppBar = () => {
  return (
    <Navbar bg="white" expand="lg" className="me-5">
    <Container className="w-100">
    <div className="d-flex justify-content-start ps-5">
        <img className="mx-3 my-3" style={{ width: "130px" }} src="/logo.png" alt="logo" /></div>
      <div className={styles.logoBorder}>
        </div>
    <div className="d-flex justify-content-end ps-5">
      {/* <Navbar.Brand className="ms-3">
        <Link href="/" passHref>
          <span className="text-light"></span>
        </Link>
      </Navbar.Brand> */}
        {/* <a className="text-light" href="/about">
            ABOUT(Reload, SSR)
          </a> */}
        <Nav className="mt-1">
          <Nav.Link className="mx-3">
            <Link href="/" passHref>HOME</Link>
          </Nav.Link>
          <Nav.Link className="mx-3">
            <Link href="/reservation" passHref>
              <a >Reservation</a>
            </Link>
          </Nav.Link>
          <Nav.Link className="mx-3">
            <Link href="/mypagereservationdetail" passHref>
              <a>MyPage</a>
            </Link>
          </Nav.Link>
          <Nav.Link className="mx-3">
            <Link href="/mypagereservationedit" passHref>
              <a>Edit</a>
            </Link>
          </Nav.Link>
        </Nav>
        
      </div>
    </Container>
  </Navbar>
  );
};

export default AppBar;