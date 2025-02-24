import MainHeader from "../components/mainHeader";
import UserIcon from "../assets/User Profile 02.svg";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";


function ProfilePage() {
    const [username, setUsername] = useState('Cannot find username');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('dummyPassword');

    const onShowHidePasswordClick = () => {
        setShowPassword(!showPassword);
    };

    return (
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
                        <h4>Password</h4>
                        <Row className="d-flex align-items-center">
                            <Col xs={9}>
                                <p className="mb-0 me-3">
                                    {showPassword ? password : '**********'}
                                </p>
                            </Col>
                            <Col xs={3} className="text-end">
                                <Button variant="secondary" size="sm" onClick={onShowHidePasswordClick}>
                                    {showPassword ? 'hide' : 'show'}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProfilePage;