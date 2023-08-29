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
  // const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const [playAgain, setPlayAgain] = useState(false)


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
  },[playAgain])

  function handleSelectAnswer (id, answer) {
    setQuestions(questions => questions.map(question =>{
      return question.id === id ? 
      {...question,
      selected: answer} :
      question

    }))
    
  }

  function selectAnswer (answer) {
    setSelectedAnswer(answer)
    handleSelectAnswer(questions.id, answer)
  }

  function checkCorrect () {
    let newCount = 0
    questions.forEach(question => {
      if(question.correct === question.selected) {
        newCount += 1
      }
    })
    setCount(newCount)
    setChecked(true)
  }

  function handlePlayAgain () {
    setPlayAgain(true)
    setCount(0)
    setChecked(false)
    setPlayAgain(false)
  }

  const questionElements = questions.map(item => {
    return <Questions
    key = {item.id}
    id = {item.id}
    setup = {item}
    handleSelectAnswer = {handleSelectAnswer}
    />
  })

  const questionCorrect = questions.map(item => {
    return <Answers
    key = {item.id}
    id = {item.id}
    setup = {item}
    handleSelectAnswer = {handleSelectAnswer}
    />
  })

  // const answerElements = questions.answers.map(answer => {
  //   const isSelected = answer === selectedAnswer
  //   const styles = {
  //     backgroundColor: isSelected ? '#D6DBF5' : 'transparent'
  //   }
  //   return (
  //     <button
  //     key = {nanoid()}
  //     style = {styles}
  //     className = 'answer-button'
  //     onClick = {() =>selectAnswer(answer)}
  //     > {decode(answer)}
  //     </button>)
  //   })
  
  return (
    <>
      {/* <Homepage/> */}
      {checked ? questionCorrect : questionElements}
      <button 
      className='check-button'
      onClick = {checked ? handlePlayAgain : checkCorrect}
      >
      {checked ? 'Play Again?' : 'Check Answers'}
      </button>
      {checked && <p className='score'>You scored {count} out of {questions.length}</p>}
    </>
  )
}

export default App
