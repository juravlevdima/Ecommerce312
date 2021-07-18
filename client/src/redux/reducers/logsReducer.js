/* eslint-disable import/no-anonymous-default-export */
import t from '../types/logsActionTypes'

const initialState = {
  logs: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_LOGS: 
      return {
        ...state,
        logs: action.logs
      }
    default:
      return state
  }
}
