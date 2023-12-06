/* eslint-disable react/prop-types */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/login"
import Signup  from "./pages/signup"
import Navbar from './pages/navbar'
import { ProblemList } from './pages/problem-list'
import { Problem } from './pages/problem'

// const Prob = ({probs}) => {
//   const {id} = useParams();
//   const problem = probs[parseInt(id, 10)];

//   return(
//     <>
//       <Navbar/>
//       <Problem p={problem}/>
//     </>
//   )
// }

export const R = () => {
  
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
          <ProblemList />
          </>
          }
        />

        <Route exact path="/problem/:id" 
          element={
            <>
          <Navbar/>
          <Problem />
          </>
          }
        />

      </Routes>
    </Router>
  )
}
