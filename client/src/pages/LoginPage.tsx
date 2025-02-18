import { Container } from "react-bootstrap";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import Login from "../components/login.tsx";
import Header from "../components/loginHeader.tsx";

function LoginPage() {
  return (
    <>
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <div className="fit-content">
      <Header></Header>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Login></Login>
          </div>
        </div>
      </div>
      </div>
      </Container>
    </>
  );
}
export default LoginPage;
