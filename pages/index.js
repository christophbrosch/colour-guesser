import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'

import Layout from './_layout'
import Header from 'components/common/Header'
import Footer from "components/common/Footer"

import DisplayTimer from 'components/index/DisplayTimer'
import DisplayRound from 'components/index/DisplayRound'
import DisplayScore from 'components/index/DisplayScore'
import DisplayBest from 'components/index/DisplayBest'

import ColourPanel from 'components/index/ColourPanel'
import CustomModal from 'components/common/CustomModal'

import { getColourData } from 'lib/game'
import { shuffle, useInterval, zip } from 'lib/utils'
import { useCookies } from 'react-cookie'

const gameTime = 5.0
export default function Game({ colours }) {
  
  const [colour, setColour] = useState("#eeeeee")
  
  const [running, setRunning] = useState(false)

  const [score, setScore] = useState(0)
  const [time, setTime] = useState(gameTime)
  const [round, setRound] = useState(0)
  const [best, setBest] = useState(0)

  const [cookies, setCookie, removeCookie] = useCookies(['best'])

  const [choices, setChoices] = useState(Array(4).fill('default'))
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [buttonVariant, setButtonVariant] = useState(Array(4).fill('primary'))

  useEffect(() => {
    window.modal.show()
  }, [])
  
  
  useInterval(() => {
    if (time <= 0.1) {
      if (parseInt(cookies['best']) < score || cookies['best'] == undefined) {
        setCookie('best', score)
      }
      reset()
      window.modal.show()
    } else {
      setTime(time - 0.1)
    }
  }, running ? 100 : null)

  const reset = () => {
    setRunning(false)
    setTime(gameTime)
    setScore(0)
    setRound(0)
  }

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
  

  const startGame = () => {
    randomlySetNewColour()
    if (cookies['best'] != undefined) {
      setBest(parseInt(cookies['best']))
    }
    setRunning(true)
  } 

  const startClickedHandler = () => {
    startGame()
  }

  const timeout = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const changeButtonVariant = (index, variant) => {
    let newButtonVariant = [...buttonVariant]
    newButtonVariant[index] = variant
    setButtonVariant(newButtonVariant)
  }

  const answerButtonHandler = async (answer, index) => {
    if (answer === correctAnswer) {
      
      changeButtonVariant(index, 'success')
      await timeout(300)
      setScore(score + 100)
      if (score > best) {
        setBest(score)
      }
      randomlySetNewColour()
      changeButtonVariant(index, 'primary')

    } else {
      changeButtonVariant(index, 'danger')
      await timeout(300)
      randomlySetNewColour()
      changeButtonVariant(index, 'primary')
    }
    setRound(round + 1)
  }


  return (
    <Layout>
      <Header running={running}/>
      <main className={`${running ? "fullscreen": ""}`}>
        <Container fluid>
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
              { zip(choices, buttonVariant).map( ([choice, state], index) => {
                return (
                  <Col xs={6} key={index} className="answer-area__choice d-flex justify-content-center">
                    <Button variant={state} onClick={() => answerButtonHandler(choice, index)} style={{textTransform: 'capitalize', width: "80%", height:"2rem", transition: "all 0.1s ease-out"}}>{choice}</Button>
                  </Col>
                )
              })}
            </Row>
          </div>
          <CustomModal onStartClickedHandler={startClickedHandler}></CustomModal>
        </Container>
        <Footer />
      </main>
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