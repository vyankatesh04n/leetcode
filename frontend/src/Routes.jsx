import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Login } from "./pages/login"
import { Signup } from "./pages/signup"
import { ProblemList } from './pages/problem-list'
import { Problem } from './pages/problem'

export const Routes = () => {
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
            <Switch>
                <Route exact path="/" component={ProblemList}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/problems">
                    <ProblemList problems={problems} />
                </Route>
                <Route exact path="/problem/:id" component={Problem}>
                    <Problem p={problems[0]}/>
                </Route>
            </Switch>
        </Router>
    )
}
