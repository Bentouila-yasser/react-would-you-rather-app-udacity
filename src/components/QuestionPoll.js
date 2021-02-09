import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class QuestionPoll extends Component {
 
  render() {
    const { question, users } = this.props;
    const avatar = users ? users[question.author].avatarURL : 'placeholder.jpg';
    if (question === null) {
        return <p>This Question doesn't existd , ERROR 404</p>
    }
    return (
      <Link to={`/questions/${question.id}`} className='questionpoll'>
        <dive className='questionpollinside'>
          <p>{`${users[question.author].name} asks:`}</p>
          <img
            src={avatar}
            alt={`Avatar of ${question.author}`}
            className='avatar'
          />
        </dive>
        <div className='questionpollinside'>
          <span>Would you rather</span>
          <span>{question.optionOne.text}</span>
          <span>OR</span>
          <span>{question.optionTwo.text}</span>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({ users }){
  return {
    users,
  }
}

export default withRouter(connect(mapStateToProps)(QuestionPoll))