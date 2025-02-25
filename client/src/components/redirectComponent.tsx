import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MainHeader from "./mainHeader";
import { useNavigate } from "react-router-dom";

interface RedirectProps {
  message: string;
  url?: string;
}

const RedirectComponent: React.FC<RedirectProps> = ({ message, url = "" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/" + url);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, url]);

  return (
    <div className="feed-page size_and_colors w-100">
      <Container fluid className="sticky-top">
        <MainHeader />
      </Container>
      <Container fluid className="mt-3 post-container">
        <Row>
          <Col xs={12} className="p-4">
            <Container>
              <h2 className="header-text">{message}</h2>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RedirectComponent;