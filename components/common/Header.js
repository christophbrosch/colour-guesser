import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export default function Header({running}) {
    return (
        <Navbar bg='white' 
                className={`${running ? "shift-up": "shadow"}`}>
            <Container fluid style={{height: "100%"}}>
                <Navbar.Brand href="#home">
                </Navbar.Brand>
                <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" 
                style={{display: "block", maxHeight: "70%", minWidth: "20%"}}></img>
            </Container>
        </Navbar>
    )
}