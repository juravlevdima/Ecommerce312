import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { GoSearch } from 'react-icons/go'
import { ImCancelCircle } from 'react-icons/im'

import { setSearchValue } from '../../redux/actions/goodsActions'

const SearchPanel = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [searchInputVisibility, setSearchVisibility] = useState(-1)
  const [searchTitle, setSearchTitle] = useState('')

  const searchInputOnChange = (e) => {
    setSearchTitle(e.target.value)
    dispatch(setSearchValue(e.target.value))
  }

  const searchButtonOnClick = () => {
    setSearchTitle('')
    dispatch(setSearchValue(''))
    setSearchVisibility(searchInputVisibility * -1)
  }

  return (
    <div>
      {location.pathname !== '/cart'
        ? (
          <div className="flex space-x-1">
            <button
              type="button"
              className="hidden sm:flex text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-3 py-2 rounded-md text-sm font-medium"
              onClick={searchButtonOnClick}
            >
              {searchInputVisibility > 0
                ? <ImCancelCircle size={20} />
                : <GoSearch size={20} />}
            </button>
            {searchInputVisibility > 0
              ? (
                <input
                  type="text"
                  value={searchTitle}
                  className="outline-none h-9 focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 rounded outline-none"
                  onChange={searchInputOnChange}
                />
              )
              : null}
            <input
              type="text"
              value={searchTitle}
              className="sm:hidden outline-none w-full h-9 focus:outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 rounded outline-none"
              onChange={searchInputOnChange}
            />
          </div>
        )
        : null}
    </div>
  )
}

export default SearchPanel
