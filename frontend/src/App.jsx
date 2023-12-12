/* eslint-disable react/prop-types */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/login"
import Signup  from "./pages/signup"
import Navbar from './pages/navbar'
import Home from './pages/home'
import { ProblemList } from './pages/problem-list'
import { Problem } from './pages/problem'


export const App = () => {
  
  return(
    <Router>
      <Routes>
        <Route exact path="/" 
          element={
          <>
          <Navbar/>
          <Home/>
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
