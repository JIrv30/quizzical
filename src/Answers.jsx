// import React from "react";
// import { useState } from "react";

// function Answers (props) {
  
//   const [correctAnswer, setCorrectAnswer] = useState(null)
  

//   const answerElements = props.setup.answers.map(answer => {
//     const iscorrect = answer === selectedAnswer
//     const styles = {
//       backgroundColor: iscorrect ? '#94D7A2' : 'transparent'
//     }
    
//     return (
//     <button
//     key = {nanoid()}
//     style = {styles}
//     className = 'answer-button'
//     onClick = {() =>selectAnswer(answer)}
//     > {decode(answer)}
//     </button>)
//   })
    
//   return (
//     <div className="question-container">
//       <h2
//       className="question-title"
//       >{decode(props.setup.question)}</h2>
//       {answerElements}

//     </div>
//   )

// }

// export default Answers