import React from 'react';
import { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate  } from "react-router-dom";

const Header = () => {

    let navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    const inputHandler = (event) => {
        setQuery(event.target.value)
    }

    const printQuery = () => {
        try {
            navigate(`/pokemon/${query}`)
        }
        catch (error) {
            setError(error.message);
        }
       
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand><strong>Pokedex</strong></Navbar.Brand>
                    </LinkContainer>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Find Pokemon..."
                        className="me-2"
                        aria-label="Search"
                        onChange={inputHandler}
                        />
                        <Button style={{ marginLeft: "10px" }} variant="light" onClick={printQuery}>Search</Button>
                    </Form>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;