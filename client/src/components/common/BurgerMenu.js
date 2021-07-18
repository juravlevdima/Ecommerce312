import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import CurrencyPanel from './CurrencyPanel'
import SortPanel from './SortPanel'
import { setSearchValue } from '../../redux/actions/goodsActions'

const Burger = () => {
  const dispatch = useDispatch()

  const navigate = (url) => {
    dispatch(setSearchValue(''))
    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `navigate to ${url} page`
      }
    })
  }

  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      <Link
        to="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        onClick={() => navigate('main')}
      >
        Главная
      </Link>
      <Link
        to="/cart"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        onClick={() => navigate('cart')}
      >
        Корзина
      </Link>
      <Link
        to="/logs"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        onClick={() => navigate('logs')}
      >
        Логи
      </Link>
      <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
        <SortPanel /> <CurrencyPanel />
      </span>
    </div>
  )
}

export default Burger
