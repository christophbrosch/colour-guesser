import Button from 'react-bootstrap/Button' 

export default function Choice( {value} )  {
    return (
        <Button variant="primary">{value}</Button>
    )
}