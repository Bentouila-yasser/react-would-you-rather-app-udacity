import React, { Component } from 'react'
import { connect } from 'react-redux'
import SaveQuestionAnswer from './SaveQuestionAnswer'
import ShowQuestionPoll from './ShowQuestionPoll'
import { Redirect } from 'react-router-dom'

class QuestionPage extends Component {

  render() {
    const { id, users,questions, authedUser } = this.props
    const questionsAnswered = Object.keys(users[authedUser].answers)
    console.log(questionsAnswered)
    const answered = questionsAnswered.indexOf(id) > -1 ? true : false;
    if(questions[id] == null) {
      return <Redirect from='*' to='/not-found' />
    }
    return (
        <div>
            {answered === false
            ?<div><SaveQuestionAnswer id={id} /></div>
            :<div><ShowQuestionPoll id={id} /></div>}
        </div>
    )
  }
}

function mapStateToProps ({ authedUser, users ,questions }, props) {
  const { id } = props.match.params

  return {
    id,
    questions,
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(QuestionPage)