import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShowQuestionPoll extends Component {

  render() {
    const { users, questions, id, authedUser } = this.props
    const question = questions[id]
    const avatar = users[question.author].avatarURL
    const optionOneLength = question.optionOne.votes.length
    const optionTwoLength = question.optionTwo.votes.length
    const votesLength = optionOneLength + optionTwoLength
    const optionOnePercentage = (optionOneLength / votesLength)*100
    const optionTwoPercentage = (optionTwoLength / votesLength)*100
    return (
      <div className='question'>
        <div>
          <p>{`${users[question.author].name} asks:`}</p>
          <img
            src={avatar}
            alt={`Avatar of ${users[question.author].name}`}
            className='avatar'
          />
        </div>
        <div>
          <span>{question.optionOne.text}</span>
          <span>with {optionOnePercentage}% of votes</span>
          <span>{optionOneLength} out of {votesLength} votes </span>
          {questions[id].optionOne.votes.indexOf(authedUser) >= 0 
            ? <span>you chosed that option</span>
            : null
          }
          <span>OR</span>
          <span>{question.optionTwo.text}</span>
          <span>with {optionTwoPercentage}% of votes</span>
          <span>{optionTwoLength} out of {votesLength} votes </span>
          {questions[id].optionTwo.votes.indexOf(authedUser) >= 0 
            ? <span>you chosed that option</span>
            : null
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps ({users, authedUser, questions}, { id }) {
    return {
      id,
      users,
      questions,
      authedUser,
    }
}

export default connect(mapStateToProps)(ShowQuestionPoll)