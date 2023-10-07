
import './homepage.css'
function Homepage (props) {

  return (
    <div className="main">
      <h1 className="header">Quizzical</h1>
      <p className="description">Test your general knowledge skills</p>
      <button 
      className="start-quiz-button"
      onClick = {()=>props.start()}
      > Start Quiz</button>
    </div>
  )
}

export default Homepage