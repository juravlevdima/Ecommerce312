import { combineReducers } from 'redux'
import products from './goodsReducer'
import logsReducer from './logsReducer'

const createRootReducer = () => combineReducers({
  products,
  logsReducer
})

export default createRootReducer
