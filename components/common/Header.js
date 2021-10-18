import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export default function Header() {
    return (
        <Navbar bg='white' style={{zIndex: 5000}}className="border shadow">
            <Container>
                <Navbar.Brand href="#home">
                    Brand link
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}