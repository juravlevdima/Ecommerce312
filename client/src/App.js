import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import Header from './components/common/Header'
import Main from './components/Main'
import Cart from './components/Cart'
import Logs from './components/Logs'
import { getExchangeRates } from './redux/actions/goodsActions'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getExchangeRates()), [dispatch])

  useEffect(() =>
    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `OPEN ECOMMERCE-312`
      }
    }),
    []
  )

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/cart" component={() => <Cart />} />
        <Route exact path="/logs" component={() => <Logs />} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App
