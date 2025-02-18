import Header from "../components/loginHeader";
import { Container } from "react-bootstrap";
import CreateUserForm from '../components/createUserForm';

function CreateUser () {
    return (
        <>
        <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="fit-content">
        <Header></Header>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <CreateUserForm></CreateUserForm>
              </div>
            </div>
          </div>
          </div>
          </Container>
        </>
      );
}

export default CreateUser;
