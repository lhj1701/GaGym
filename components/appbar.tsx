import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";

const AppBar = () => {
  return (
    <Navbar bg="white" expand="lg" className="me-5">
    <Container className="w-100">
      <Navbar.Brand className="ms-3">
        <Link href="/" passHref>
        <img className="mx-3 my-3" style={{ width: "130px" }} src="/logo.png" alt="logo" />
        </Link>
      </Navbar.Brand>
    <div className="d-flex justify-content-end ps-5">
        <Nav>
          {/* <Nav.Link className="mx-3">
            <Link href="/" passHref>HOM</Link>
          </Nav.Link> */}
          <Nav.Link className="mx-3">
            <Link href="/addreservation" passHref>
              <a >Reservation</a>
            </Link>
          </Nav.Link>
          <Nav.Link className="mx-3">
            <Link href="/mypage/myreservation" passHref>
              <a>MyPage</a>
            </Link>
          </Nav.Link>
          {/* <Nav.Link className="mx-3">
            <Link href="/mypage/myreservation/edit" passHref>
              <a>Edit</a>
            </Link>
          </Nav.Link> */}
        </Nav>
        
      </div>
    </Container>
  </Navbar>
  );
};

export default AppBar;