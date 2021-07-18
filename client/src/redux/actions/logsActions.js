import axios from "axios"
import t from '../types/logsActionTypes'

export function getLogs() {
  return (dispatch) => {
    axios.get('/api/v1/logs').then(({ data: logs }) => {
      dispatch({ type: t.GET_LOGS, logs })
    })
  }
}

export function clearLogs() {
  return (dispatch) => {
    axios
      .delete('/api/v1/logs')
      .then(() => {
        axios.get('/api/v1/logs')
          .then(({ data: logs }) => {
            dispatch({ type: t.GET_LOGS, logs })
          })
      })
  }
}
