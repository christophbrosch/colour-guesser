import { useEffect } from "react"

export default function ColourPanel( {colour} ) {

    useEffect(() => {
        console.log('This colour has reached the office:', colour)
    },[])

    return (
        <div style={{backgroundColor: colour, width: "100%", height: "100%"}}></div>
    )
} 