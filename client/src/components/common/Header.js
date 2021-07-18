import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import { GiHamburgerMenu, GiShoppingCart } from 'react-icons/gi'
import { GoSearch } from 'react-icons/go'
import { ImCancelCircle } from 'react-icons/im'
import { AiOutlineHome } from 'react-icons/ai'
import { FaRegFileCode } from 'react-icons/fa'

import CurrencyPanel from './CurrencyPanel'
import SortPanel from './SortPanel'
import Burger from './BurgerMenu'
import SearchPanel from './SearchPanel'
import MediumBurger from './MediumBurger'
import { setSearchValue } from '../../redux/actions/goodsActions'

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [burgerButton, toggleBurgerButton] = useState(-1)
  const [mediumBurgerButton, toggleMediumBurgerButton] = useState(-1)
  const [searchButton, toggleSearchButton] = useState(-1)

  const currency = useSelector((s) => s.products.currentСurrency)
  const totalInCart = useSelector((s) => Object.values(s.products.cartList)).reduce(
    (acc, it) => acc + it.quantity,
    0
  )
  const totalPrice = useSelector((s) => Object.values(s.products.cartList))
    .reduce((acc, it) => acc + +it.price * it.quantity * currency[0], 0)
    .toFixed(2)

  const navigate = (url) => {
    window.scroll(0, 0)
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
    <nav className="bg-gray-800 custom-shadow sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start -mx-3">

            <div className="absolute inset-y-0 left-4 flex items-center sm:hidden text-white">
              <button
                type="button"
                onClick={() => {
                  if (searchButton > 0) toggleSearchButton(searchButton * -1)
                  toggleBurgerButton(burgerButton * -1)
                }}
              >
                <GiHamburgerMenu />
              </button>
            </div>

            {location.pathname !== '/cart'
              ? (
                <div className="absolute inset-y-0 left-16 flex items-center sm:hidden text-white">
                  <button
                    type="button"
                    onClick={() => {
                      if (burgerButton > 0) toggleBurgerButton(burgerButton * -1)
                      if (searchButton > 0) dispatch(setSearchValue(''))
                      toggleSearchButton(searchButton * -1)
                    }}
                  >
                    {searchButton > 0 ? <ImCancelCircle /> : <GoSearch />}
                  </button>
                </div>
              )
              : null}

            <div className="hidden sm:block sm:ml-1">
              <div className="flex space-x-5">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="hidden sm:block lg:hidden sm:ml-1 text-white"
                    onClick={() => toggleMediumBurgerButton(mediumBurgerButton * -1)}
                  >
                    <GiHamburgerMenu />
                  </button>
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-2 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('main')}
                  >
                    <div className="hidden lg:inline sm:ml-1">Главная</div>
                    <div className="sm:block md:block lg:hidden xl:hidden sm:ml-1">
                      <AiOutlineHome size={20} />
                    </div>
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-2 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('cart')}
                  >
                    <div className="hidden lg:inline sm:ml-1">Корзина</div>
                    <div className="sm:block md:block lg:hidden xl:hidden sm:ml-1">
                      <GiShoppingCart size={20} />
                    </div>
                  </Link>
                  <Link
                    to="/logs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-2 py-2 rounded-md text-sm font-medium"
                    onClick={() => navigate('logs')}
                  >
                    <div className="hidden lg:inline sm:ml-1">Логи</div>
                    <div className="sm:block md:block lg:hidden xl:hidden sm:ml-1">
                      <FaRegFileCode size={20} />
                    </div>
                  </Link>
                </div>
                <div className="flex space-x-4">
                  <div className="hidden lg:flex text-white flex space-x-4">
                    <CurrencyPanel />
                    <SortPanel />
                  </div>
                  <SearchPanel />
                </div>
              </div>
            </div>

            <div className="origin-top-right absolute right-0 mt-3.5 w-30 text-white px-3 py-1 rounded-md text-sm font-medium">
              Товаров в корзине: {totalInCart}
            </div>
            <div className="origin-top-right absolute right-0 -mt-2.5 w-30 text-white px-3 py-1 rounded-md text-sm font-medium">
              Общая стоимость: {totalPrice} {currency[1]}
            </div>

          </div>
        </div>
      </div>

      <div className="sm:hidden">
        {burgerButton > 0
          ? <Burger onClick={() => toggleBurgerButton(burgerButton * -1)} />
          : null}
      </div>
      <div className="hidden sm:block lg:hidden">
        {mediumBurgerButton > 0 ? <MediumBurger /> : null}
      </div>

      <div className="sm:hidden">
        {searchButton > 0
          ? (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                <SearchPanel />
              </span>
            </div>
          )
          : null}
      </div>

    </nav>
  )
}

export default Header
