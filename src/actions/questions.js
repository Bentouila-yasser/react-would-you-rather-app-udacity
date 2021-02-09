import { saveTheQuestion, saveTheQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const SAVE_QUESTION = 'SAVE_QUESTION'

function saveQuestion (question) {
  return {
    type: SAVE_QUESTION,
    question,
  }
}

export function handleSaveQuestion (optionOneText, optionTwoText, authedUser) {
  return function(dispatch) {

    const questionInfo = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    dispatch(showLoading())

    return saveTheQuestion(questionInfo)
      .then((question) => dispatch(saveQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function saveQuestionAnswer ({ authedUser, qid, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveQuestionAnswer ( info ) {
  return function( dispatch ) {
    console.log(`the fucking authedUser are ${info}`)
    dispatch(showLoading())

    return saveTheQuestionAnswer(info)
      .then(function() { dispatch((saveQuestionAnswer(info))) })
      .then(() => dispatch(hideLoading()))
  }
}