import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from './_layout'

import DisplayTimer from 'components/index/DisplayTimer'
import DisplayRound from 'components/index/DisplayRound'
import DisplayScore from 'components/index/DisplayScore'
import DisplayBest from 'components/index/DisplayBest'

import ColourPanel from 'components/index/ColourPanel'
import Choice from 'components/index/Choice'
import CustomModal from 'components/common/CustomModal'

import { getColourData } from 'lib/game'
import { shuffle, useInterval } from 'lib/utils'

export default function Game({ colours }) {
  
  const [colour, setColour] = useState("#eeeeee")
  
  const [running, setRunning] = useState(false)

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

  useInterval(() => {
    if (time <= 0.0) {
      location.reload()
    } else {
      setTime(time - 0.1)
    }
  }, running ? 100 : null)

  const startGame = () => {
    randomlySetNewColour()
    setRunning(true)
  } 

  const startClickedHandler = () => {
    startGame()
  }

  const answerButtonHandler = (answer) => {
    if (answer === correctAnswer) {
      randomlySetNewColour()
    }
  }

  useEffect(() => {
    window.modal.show()
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
      <div className="container">
        <Row className="answer-area align-items-center">
          { choices.map( (choice, index) => {
            return (
              <Col xs={3} md={6} key={index} className="answer-area__choice d-flex justify-content-center">
                <Choice onClick={() => answerButtonHandler(choice)} value={choice}/>
              </Col>
            )
          })}
        </Row>
      </div>
      <CustomModal onStartClickedHandler={startClickedHandler}></CustomModal>
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