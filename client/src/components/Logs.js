import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import axios from 'axios'

import { getLogs, clearLogs } from '../redux/actions/logsActions'

const Logs = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { logs } = useSelector((s) => s.logsReducer)

  useEffect(() => {
    setTimeout(() => dispatch(getLogs()), 100)
  }, [dispatch])

  const navigate = () => {
    window.scroll(0, 0)
    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `navigate to main page`
      }
    })
    history.push('/')
  }

  return (
    <div className="absolute top-0 z-50 w-full h-full bg-white">
      <nav className="bg-gray-800 custom-shadow fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="sm:block sm:ml-1">
                <div className="flex space-x-12">
                  <button
                    type="button"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={navigate}
                  >
                    Главная
                  </button>
                  <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                    Всего записей: {logs.length}
                  </div>
                  <button
                    type="button"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => dispatch(clearLogs())}
                  >
                    Очистить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {logs.map((it) => {
        return (
          <div key={it.time} className="border-b border-gray-300 pl-10 flex space-x-20">
            <span className="whitespace-nowrap">{it.time}</span>
            <span className="whitespace-nowrap">{it.action}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Logs
