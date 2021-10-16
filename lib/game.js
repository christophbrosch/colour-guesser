import fs from 'fs'

export function getColourData() {
    const fileContents = fs.readFileSync('colours.json', 'utf8')
    return JSON.parse(fileContents)    
}