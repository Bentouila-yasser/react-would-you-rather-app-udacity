import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'

class SaveQuestionAnswer extends Component {
  state = {
    selectedOption: ''
  }

  onValueChange = (e) => {
    const selectedOption = e.target.value

    this.setState({
      selectedOption
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedOption } = this.state
    const { dispatch, authedUser, question } = this.props
    console.log(`the selectedOption is ${selectedOption} and the authedUser is ${authedUser} and the questionsId is ${question.id}`)
    dispatch(handleSaveQuestionAnswer({ authedUser, qid: question.id, answer: selectedOption }))

    this.setState(() => ({
      selectedOption: ''
    }))
  }
  render() {
    const { selectedOption } = this.state
    const { users, question } = this.props
    const avatar = question ? users[question.author].avatarURL : 'placeholder.jpg';

    return (
      <div className='questionanswer'>
        <div>
          <p>{`${users[question.author].name} asks:`}</p>
          <img
              src={avatar}
              alt={`Avatar of ${users[question.author].name}`}
              className='avatar'
          />
        </div>
        <div>
          <form onSubmit={this.handleSubmit} className='formright'>
            <span>Would you rather</span>
            <div className="radio">
              <label>
                  <input
                  type="radio"
                  value="optionOne"
                  checked={this.state.selectedOption === "optionOne"}
                  onChange={this.onValueChange}
                  />
                  {question.optionOne.text}
              </label>
            </div>
            <span>OR</span>
            <div className="radio">
              <label>
                  <input
                  type="radio"
                  value="optionTwo"
                  checked={this.state.selectedOption === "optionTwo"}
                  onChange={this.onValueChange}
                  />
                  {question.optionTwo.text}
              </label>
            </div>
            <button 
              className="btn btn-default" 
              type="submit"
              disabled={selectedOption === ''}>
                Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions}, { id }) {
  
    return {
      authedUser,
      users,
      question: questions[id],
    }
}

export default connect(mapStateToProps)(SaveQuestionAnswer)