import logo from "../assets/Logo.svg";
function Header() {
  return (
    <header className="py-3 standard-font">
      <div className="container text-center">
        <img src={logo} alt="Chatter Logo" className="img" width="500" />
        <h1 className="header-text">Welcome to Chatter!</h1>
      </div>
    </header>
  );
}

export default Header;
