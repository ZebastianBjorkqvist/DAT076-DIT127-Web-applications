import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

function SearchComponent({ onSearch }: SearchComponentProps) {

    const [topic, setTopic] = useState("");

    const handleSearch = () => {
        onSearch(topic);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(e.target.value);
    };

    return (
        <div className="mb-3">
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column sm="2" className="text-left">
                        Search topics
                    </Form.Label>
                    <Col sm="8">
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Write your topic here"
                                value={topic}
                                onChange={handleInputChange}
                                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (event.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                            <Button variant="primary" onClick={handleSearch}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                </Form.Group>
        </div>
    );
}

export default SearchComponent;