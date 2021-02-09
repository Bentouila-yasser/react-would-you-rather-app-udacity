import checker from './checker';
import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

export default applyMiddleware(
  thunk,
  checker,
  logger,
)