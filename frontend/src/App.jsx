/* eslint-disable no-unused-vars */
import { Login } from "./pages/login"

function App() {

  const problems = [
    {
      title: 'find maximum element in an array',
      difficulty: 'easy',
      acceptance: '52%'
    },
    {
      title: 'Remove Linked List Elements',
      difficulty: 'hard',
      acceptance: ' 30%'
    },
    {
      title: 'Bitwise AND of Numbers Range',
      difficulty: 'medium',
      acceptance: ' 40%'
    }
  ]

  return (
    <div>
      <Login/>
    </div>
  )
}

export default App
