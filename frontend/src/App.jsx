/* eslint-disable react/prop-types */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/login"
import Signup  from "./pages/signup"
import Navbar from './pages/navbar'
import Nav from './pages/nav'
import Home from './pages/home'
import { ProblemList } from './pages/problem-list'
import { Problem } from './pages/problem'
import { Submissions } from './pages/submissions'
import { useState } from 'react';
import { QnSub } from './pages/qnSub'

export const App = () => {

  const [username, setUsername] = useState("");

  const handleUserNameChange = (username) => {
    setUsername(username);
  }
  
  return(
    <Router>
      <Routes>
        <Route exact path="/" 
          element={
          <>
          <Navbar onUserNameChange={handleUserNameChange}/>
          <Home userName={username} onUserNameChange={handleUserNameChange}/>
          </>
          }
        />

        <Route exact path="/login" 
          element={
          <>
          <Nav />
          <Login />
          </>
          }
        />

        <Route exact path="/signup" 
          element={
          <>
          <Nav/>
          <Signup />
          </>
          }
        />
          
        <Route exact path="/problems" 
          element={
          <>
          <Navbar onUserNameChange={handleUserNameChange}/>
          <ProblemList />
          </>
          }
        />

        <Route exact path="/problem/:id" 
          element={
            <>
          <Navbar onUserNameChange={handleUserNameChange}/>
          <Problem />
          </>
          }
        />

        <Route exact path="/submissions" 
          element={
          <>
          <Navbar onUserNameChange={handleUserNameChange}/>
          <Submissions />
          </>
          }
        />

        <Route exact path="/submission/:email/:qid" 
          element={
          <>
          <Navbar onUserNameChange={handleUserNameChange}/>
          <QnSub />
          </>
          }
        />

      </Routes>
    </Router>
  )
}
