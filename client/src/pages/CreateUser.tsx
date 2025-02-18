import Header from "../components/loginHeader";
import NewUser from "../components/newUser";
import { Container } from "react-bootstrap";

function CreateUser () {
    return (
        <>
        <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="fit-content">
        <Header></Header>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <NewUser></NewUser>
              </div>
            </div>
          </div>
          </div>
          </Container>
        </>
      );
}

export default CreateUser;
