import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from './_layout'

import DisplayTimer from 'components/index/DisplayTimer'
import DisplayRound from 'components/index/DisplayRound'
import DisplayScore from 'components/index/DisplayScore'
import DisplayBest from 'components/index/DisplayBest'

import ColourPanel from 'components/index/ColourPanel'
import Choice from 'components/index/Choice'

import { getColourData } from 'lib/game'

export default function Game({ colours }) {
  
  const [colour, setColour] = useState("#eeeeee")

  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20.0)
  const [round, setRound] = useState(0)
  const [best, setBest] = useState(0)

  const [choices, setChoices] = useState(Array(4).fill('default'))

  
  const randomlySetNewColour = function() {
    let keys = Object.keys(colours)
    const primaryColour = keys[keys.length * Math.random() << 0]

    keys = Object.keys(colours[primaryColour])
    const secondaryColour = keys[keys.length * Math.random() << 0]

    const newColour = colours[primaryColour][secondaryColour]
    setColour(newColour)

    console.log('New colour:', newColour)
  }

  useEffect(() => {
    const interval = setInterval(randomlySetNewColour, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <Row className="context">
        <Col className="context__box context__box--timer">
          <h4 className="context__header">Time:</h4>
          <DisplayTimer value={time}/>
        </Col>
        <Col className="context__box context__box--round">
          <h4 className="context__header">Round:</h4>
          <DisplayRound value={round}/>
        </Col>
        <Col className="context__box context__box--score">
          <h4 className="context__header">Score:</h4>
          <DisplayScore value={score}/>
        </Col>
        <Col className="context__box context__box--header">
          <h4 className="context__header">Best:</h4>
          <DisplayBest value={best}/>
        </Col>
      </Row>
      <Row className="colourpanel">
        <ColourPanel colour={colour}/>
      </Row>
      <Row className="answer-area align-items-center">
        { choices.map( (choice, index) => {
          return (
            <Col key={index} className="answer-area__choice d-flex justify-content-center">
              <Choice value={choice}/>
            </Col>
          )
        })}
      </Row>
    </Layout>
  )
}

export async function getStaticProps() {
  const colours = getColourData()

  return {
    props: {
      colours: colours
    }
  }
}

