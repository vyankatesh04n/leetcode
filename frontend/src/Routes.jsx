/* eslint-disable react/prop-types */
import {BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom'
import Login from "./pages/login"
import Signup  from "./pages/signup"
import Navbar from './pages/navbar'
import { ProblemList } from './pages/problem-list'
import { Problem } from './pages/problem'

const Prob = ({probs}) => {
  const {id} = useParams();
  const problem = probs[parseInt(id, 10)];

  return(
    <>
      <Navbar/>
      <Problem p={problem}/>
    </>
  )
}

export const R = () => {
  const problems = [
    {
      title: 'find maximum element in an array',
      difficulty: 'easy',
      acceptance: '52%',
      io: [{
        input: [1, 2, 3, 4, 5],
        output: 5
      },
      {
        input: [4, 2, 9, -3, 5],
        output: 9
      }]
    },
    {
      title: 'Remove Linked List Elements',
      difficulty: 'hard',
      acceptance: ' 30%',
      io: [{
        input: [1, 2, 3, 4, 5],
        output: 5
      },
      {
        input: [4, 2, 9, -3, 5],
        output: 9
      }]
    },
    {
      title: 'Bitwise AND of Numbers Range',
      difficulty: 'medium',
      acceptance: ' 45%',
      io: [{
        input: [1, 2, 3, 4, 5],
        output: 5
      },
      {
        input: [4, 2, 9, -3, 5],
        output: 9
      }]
    }
  ]

  return(
    <Router>
      <Routes>
        <Route exact path="/" 
          element={
          <>
          <Navbar/>
          <Login/>
          </>
          }
        />

        <Route exact path="/login" 
          element={
          <>
          <Navbar/>
          <Login/>
          </>
          }
        />

        <Route exact path="/signup" 
          element={
          <>
          <Navbar/>
          <Signup/>
          </>
          }
        />
          
        <Route exact path="/problems" 
          element={
          <>
          <Navbar/>
          <ProblemList problems={problems}/>
          </>
          }
        />

        <Route exact path="/problem/:id" 
          element={
            <Prob probs={problems}/>
          }
        />

      </Routes>
    </Router>
  )
}
