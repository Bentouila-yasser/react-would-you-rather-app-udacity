import { RECEIVE_QUESTIONS, SAVE_QUESTION_ANSWER, SAVE_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION_ANSWER :
        
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat(action.authedUser),
          },
        },
      }
    case SAVE_QUESTION :
        const { question } = action

      return {
        ...state,
            [question.id]: question
      };
    default :
      return state;
  }
}