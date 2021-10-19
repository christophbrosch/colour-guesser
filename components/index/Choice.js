import Button from 'react-bootstrap/Button' 

export default function Choice( {onClick, value} )  {
    return (
        <Button variant="primary" onClick={onClick} style={{textTransform: 'capitalize', width: "80%", height:"2rem"}}>{value}</Button>
    )
}