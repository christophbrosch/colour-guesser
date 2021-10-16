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
import { shuffle } from 'lib/utils'

export default function Game({ colours }) {
  
  const [colour, setColour] = useState("#eeeeee")
  
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20.0)
  const [round, setRound] = useState(0)
  const [best, setBest] = useState(0)

  const [choices, setChoices] = useState(Array(4).fill('default'))
  const [correctAnswer, setCorrectAnswer] = useState('')

  const randomlySetNewColour = function() {

    let copiedColour = JSON.parse(JSON.stringify(colours))

    function getRandomKey(obj) {
      let keys = Object.keys(obj)
      return keys[keys.length * Math.random() << 0]
    }

    let primaryColour = getRandomKey(copiedColour)
    setCorrectAnswer(primaryColour)

    const secondaryColour = getRandomKey(copiedColour[primaryColour])
    const newColour = copiedColour[primaryColour][secondaryColour]

    let choices = [primaryColour]
    
    for (let i = 0; i <3; i++) {
      delete copiedColour[primaryColour]
      primaryColour = getRandomKey(copiedColour)
      choices.push(primaryColour)
    }

    choices = shuffle(choices)

    setColour(newColour)
    setChoices(choices)
  }

  const answerButtonHandler = (answer) => {
    console.log(correctAnswer)
    if (answer === correctAnswer) {
      randomlySetNewColour()
    }
  }

  useEffect(() => {
    randomlySetNewColour()
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
              <Choice onClick={() => answerButtonHandler(choice)} value={choice}/>
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