import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPoll from './QuestionPoll'

class Dashboard extends Component {
    state = {
        showAnswered: false,
      }

    handleChange = (answer) => {
        this.setState(() => ({
            showAnswered: answer
        }))
    }

  render() {
    const { showAnswered } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter(function(question) {
      const contains = (
        question.optionOne.votes.indexOf(authedUser) > -1 ||
        question.optionTwo.votes.indexOf(authedUser) > -1
      );
      return showAnswered ? contains : !contains;
    });
    const sortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div className='dashboard'>
        <h3 className='center'>Dashboard</h3>
        <div className='btn-group'>
          <button 
            className={!showAnswered ? 'btn-lft active' : 'btn-lft'} 
            onClick={(e) => this.handleChange(false)}
          >
            Unanswered Question
          </button>
          <button 
            className={showAnswered ? 'btn-rght active' : 'btn-rght'} 
            onClick={(e) => this.handleChange(true)}
          >
            Answered Question
          </button>
        </div>
        <div>
          <ul className='dashboard-list'>
            {sortedQuestions.map((question) => (
                <li key={question.id}>
                  <QuestionPoll question={question} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard)