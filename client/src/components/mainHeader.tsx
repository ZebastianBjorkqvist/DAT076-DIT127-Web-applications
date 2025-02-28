import { logout } from "../api";
import logoIcon from "../assets/logo-icon.svg";
import Logout from "../assets/Logout 02.svg";
import UserIcon from "../assets/User Profile 02.svg";
import "../styles/feed.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";



function MainHeader() {
  const navigate = useNavigate();
  const authContext = useAuth();
  

  const handleLogout = async () => {
    const success = await logout();

    if (success) {
      authContext.setIsAuthenticated(false);
      navigate("/"); 
    } 
  };

  const navigateTo = async (path: string) => {
    navigate(path)
  }

	return (
    <Navbar className="p-3 header_colors w-100 no-padding standard-font" >
      <Container>
        {/* Left side: App logo and name */}
        <Navbar.Brand onClick={() => navigateTo("/feed")} className="header-text" data-testid="logo-btn">
          <img
            src={logoIcon}
            alt="App Logo"
            className="me-3"

          />
          Chatter
        </Navbar.Brand>

        {/* Right side: Icons */}
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigateTo("/profile")} data-testid="profile-btn">
					<img
            src={UserIcon}
            alt="User icon"
          />
          </Nav.Link>
          <Nav.Link onClick={handleLogout} data-testid="log-out-btn">
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
