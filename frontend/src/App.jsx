/* eslint-disable react/prop-types */
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./pages/login"
import Signup  from "./pages/signup"
import Navbar from './pages/navbar'
import Nav from './pages/nav'
import Home from './pages/home'
import { ProblemList } from './pages/problem-list'
import { Problem } from './pages/problem'
import { useState } from 'react';

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
          <Navbar userName={username}/>
          <Home userName={username}/>
          </>
          }
        />

        <Route exact path="/login" 
          element={
          <>
          <Navbar userName={username}/>
          <Login userName={username}/>
          </>
          }
        />

        <Route exact path="/signup" 
          element={
          <>
          <Nav/>
          <Signup userName={username} onUserNameChange={handleUserNameChange}/>
          </>
          }
        />
          
        <Route exact path="/problems" 
          element={
          <>
          <Navbar userName={username}/>
          <ProblemList userName={username}/>
          </>
          }
        />

        <Route exact path="/problem/:id" 
          element={
            <>
          <Navbar userName={username}/>
          <Problem userName={username}/>
          </>
          }
        />

      </Routes>
    </Router>
  )
}
