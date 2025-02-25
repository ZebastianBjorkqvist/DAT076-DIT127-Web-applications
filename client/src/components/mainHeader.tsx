import logoIcon from "../assets/logo-icon.svg";
import Logout from "../assets/Logout 02.svg";
import UserIcon from "../assets/User Profile 02.svg";
import "../styles/feed.css";
import { Navbar, Container, Nav } from "react-bootstrap";



function MainHeader() {
	return (
    <Navbar className="p-3 header_colors w-100 no-padding standard-font" >
      <Container>
        {/* Left side: App logo and name */}
        <Navbar.Brand href="./feed" className="header-text" data-testid="logo-btn">
          <img
            src={logoIcon}
            alt="App Logo"
            className="me-3"

          />
          Chatter
        </Navbar.Brand>

        {/* Right side: Icons */}
        <Nav className="ms-auto">
          <Nav.Link href="./feed" data-testid="profile-btn">
					<img
            src={UserIcon}
            alt="User icon"
          />
          </Nav.Link>
          <Nav.Link href="./" data-testid="log-out-btn">
					<img
            src={Logout}
            alt="Log-out icon"
          />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};


export default MainHeader;
