import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket} from '@fortawesome/free-solid-svg-icons';

const NavigationMenu = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" as= {NavLink}
                ><FontAwesomeIcon icon={faTicket}  className='me-2'/>Movies on tip
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/movies-in-theaters" as= {NavLink}>Movies in theaters</Nav.Link>
                    <Nav.Link href="/movies-coming" as= {NavLink}>Coming soon</Nav.Link>
                    <Nav.Link href="/top-rated-india" as= {NavLink}>Top rated Indian</Nav.Link>
                    <Nav.Link href="/top-rated-movies" as= {NavLink}>Top rated movies</Nav.Link>
                    <Nav.Link href="/favourite" as= {NavLink}>Favourites</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
      </Navbar>
    );
  };
  
  export default NavigationMenu;