import Header from "./components/loginHeader";
import NewUser from "./components/newUser";

function CreateUser () {
    return (
        <>
        <Header></Header>
          <div className="App">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <NewUser></NewUser>
              </div>
            </div>
          </div>
        </>
      );
}

export default CreateUser;