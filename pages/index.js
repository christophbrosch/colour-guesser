import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from './_layout'

import DisplayTimer from 'components/index/DisplayTimer'
import DisplayRound from 'components/index/DisplayRound'
import DisplayScore from 'components/index/DisplayScore'
import DisplayBest from 'components/index/DisplayBest'

import ColorPanel from 'components/index/ColorPanel'
import Choice from 'components/index/Choice'

export default function Game() {
  
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(20.0)
  const [round, setRound] = useState(0)
  const [best, setBest] = useState(0)

  const [choices, setChoices] = useState(Array(4).fill('default'))

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
      <Row className="colorpanel">
        <ColorPanel />
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
