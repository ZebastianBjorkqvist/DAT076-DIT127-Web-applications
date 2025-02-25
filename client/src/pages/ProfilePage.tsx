import MainHeader from "../components/mainHeader";
import UserIcon from "../assets/User Profile 02.svg";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { checkAuth, getCurrentUser } from "../api";
import RedirectComponent from "../components/redirectComponent";


function ProfilePage() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [username, setUsername] = useState('Cannot find username');
    const [email, setEmail] = useState('Cannot find email');

    useEffect(() => {
        checkAuth().then((isAuthenticated) => {
            if (!isAuthenticated) {
                setIsAuthenticated(false);
                console.log("You need to be logged in to access this page. Redirecting...");
            }
        }
        );
        getCurrentUser().then((user) => {
            if (user == undefined) {
            } else {
                setUsername(user.username);
                setEmail(user.email);
            }
        });
    }, []);

    return isAuthenticated ? (
        <>
            <MainHeader />
            <Container className="mt-5 align-items-center d-flex flex-column justify-content-center">

                <h1 className="text-center">Profile</h1>
                <Row className="mt-5" style={{ maxWidth: '500px', width: '100%', padding: '20px', backgroundColor: '#E5DCDF' }}>

                    <Col md={4} className="text-center" style={{ paddingTop: '10px' }}>
                        <img
                            src={UserIcon}
                            alt="User Icon"
                            className="img-fluid"
                            width="50%"
                        />
                    </Col>

                    <Col md={8} className="text-start" style={{ paddingLeft: '40px', paddingTop: '10px' }}>
                        <h4>Username</h4>
                        <p>{username}</p>
                        <h4>Email</h4>
                        <p>{email}</p>
                    </Col>
                </Row>
            </Container>
        </>
    ) : (
        <RedirectComponent message="You need to be logged in to access this page. Redirecting..." url="" />
    );
}

export default ProfilePage;