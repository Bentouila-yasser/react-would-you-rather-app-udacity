import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'
import QuestionPage from './QuestionPage'
import CreateQuestion from './CreateQuestion'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import ProtectedRoute from '../utils/ProtectedRoute';
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loggedIn } = this.props;
    
    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Nav />
              <div>
                <Switch>
                  <ProtectedRoute path='/' exact component={Dashboard} loggedIn={loggedIn} />
                  <ProtectedRoute path='/leaderboard' component={LeaderBoard} loggedIn={loggedIn} />
                  <ProtectedRoute path='/add' component={CreateQuestion} loggedIn={loggedIn} />
                  <ProtectedRoute path='/questions/:id' exact component={QuestionPage} loggedIn={loggedIn} />
                  <Route path='/login' exact component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
  }
}

export default connect(mapStateToProps)(App)