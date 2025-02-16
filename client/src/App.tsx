import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.tsx";
import Header from "./components/loginHeader.tsx";

function App() {
  return (
    <>
      <Header></Header>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Login></Login>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
