import React from "react";
import { useState } from "react";
import { decode, decodeEntity } from 'html-entities';
import { nanoid } from "nanoid";
import './questions.css'


function Questions (props) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  

  function selectAnswer (answer) {
    setSelectedAnswer(answer)
    props.handleSelectAnswer(props.id, answer)
  }

   
  
  
  const answerElements = props.setup.answers.map(answer => {
    const isSelected = answer === selectedAnswer
    const styles = {
      backgroundColor: isSelected ? '#D6DBF5' : 'transparent'
    }
    
    return (
    <button
    key = {nanoid()}
    style = {styles}
    className = 'answer-button'
    onClick = {() =>selectAnswer(answer)}
    > {decode(answer)}
    </button>)
  })
    
  return (
    <div className="question-container">
      <h2
      className="question-title"
      >{decode(props.setup.question)}</h2>
      {answerElements}

    </div>
  )
}

export default Questions