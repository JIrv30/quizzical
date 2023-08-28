import React from 'react'
import { useEffect, useState } from "react";
import { decode, decodeEntity } from 'html-entities';
import {nanoid} from 'nanoid'
import Homepage from './Homepage'
import Questions from './Questions'
import Answers from './Answers'

import './App.css'

function App() {
  const [questions, setQuestions] = useState([])


  const shuffleArray = (arr) => arr.sort(()=>Math.random()-0.5)

  useEffect(()=>{
    async function getQuestion (){
      const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium')
      const data = await res.json()
      
      let q = []
      data.results.forEach(question => {
        q.push({
          id:nanoid(),
          question: question.question,
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          correct: question.correct_answer,
          selected: null,
          checked: false
        })
        setQuestions(q)
      })
    }
    getQuestion()
  },[])

  console.log(questions)

  const questionElements = questions.map(item => {
    return <Questions
    key = {item.id}
    id = {item.id}
    setup = {item}

    />
  })


  
  return (
    <>
      {/* <Homepage/> */}
      {questionElements}
      {/* {answerElements} */}
    </>
  )
}

export default App
