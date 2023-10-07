import React from 'react'
import { useEffect, useState } from "react";
import { decode, decodeEntity } from 'html-entities';
import {nanoid} from 'nanoid'
import Homepage from './Homepage'
import Questions from './Questions'
import blob1 from './assets/blob1.svg'
import blob2 from './assets/blob2.svg'


function App() {
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const [playAgain, setPlayAgain] = useState(false)
  const [started, setStarted] = useState(false)


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
    console.log(playAgain)
    setCount(0)
    setChecked(false)
    
  }

  function start () {
    setStarted(prevState=>!prevState)
  }

  

  const questionElements = questions.map(item => {
    return <Questions
    key = {item.id}
    id = {item.id}
    setup = {item}
    handleSelectAnswer = {handleSelectAnswer}
    checked = {checked}
    />
  })

  
  return (
    <>
    <div className='main-container'>
      <div className='content-container'>
        {started ? 
          <div>
            
            {questionElements}
            
            <button 
            className='check-button'
            onClick = {checked ? handlePlayAgain : checkCorrect}
            >
            {checked ? 'Play Again?' : 'Check Answers'}
            </button>
            
            {checked && <p className='score'>You scored {count} out of {questions.length}</p>}
          </div>
          :
          <Homepage start={start} />
      }
      </div>

        <div className='blob1'>
          <img className='left' src={blob1} />
        </div>
      
        <div className='blob2'>
        <img className='left' src={blob2} />
      </div>
    </div>
    </>
  )
}

export default App
