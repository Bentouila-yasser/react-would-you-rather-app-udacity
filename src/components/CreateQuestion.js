import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class CreateQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  optionOnehandleChange = (e) => {
    const optionOneText = e.target.value

    this.setState({
      optionOneText
    });
  }

  optionTwohandleChange = (e) => {
    const optionTwoText = e.target.value

    this.setState({
      optionTwoText
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleSaveQuestion(optionOneText, optionTwoText, authedUser))

    return this.setState(() => ({
        optionOneText: '',
        optionTwoText: '',
        toHome: true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3 className='center'>Create New Question</h3>
        <form onSubmit={this.handleSubmit} className='new-question'>
          <span>Complete the question :</span>
          <span>Would you rather ...</span>
          <div className="textarea">
            <input
              placeholder="Enter Option One Text Here"
              type="text"
              value={optionOneText}
              onChange={this.optionOnehandleChange}
            />
          </div>
          <span>OR</span>
          <div className="textarea">
            <input
              placeholder="Enter Option Two Text Here"
              type="text"
              value={optionTwoText}
              onChange={this.optionTwohandleChange}
            />
          </div>
          <button 
            className="btn btn-default" 
            type="submit"
            disabled={(optionOneText.length * optionTwoText.length) === 0}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({users, questions, authedUser}, { id }) {
    const question = questions[id]
  
    return {
      authedUser,
      users,
      question
    }
}

export default connect(mapStateToProps)(CreateQuestion)