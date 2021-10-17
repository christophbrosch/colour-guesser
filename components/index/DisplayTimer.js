export default function DisplayTimer( {value} ) {
    return (
        <span>{Math.round(value * 10) / 10}</span>
    )
}