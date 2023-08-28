import React from "react";
import { decode, decodeEntity } from 'html-entities';
import { nanoid } from "nanoid";


function Questions (props) {

  const answerElements = props.setup.answers.map(answer => {
    return (
    <button
    key = {nanoid()}
    > {answer}

    </button>)
  })
    
  return (
    <div>
      <h2>{props.setup.question}</h2>
      {answerElements}

    </div>
  )
}

export default Questions