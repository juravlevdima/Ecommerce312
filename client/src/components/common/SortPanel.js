import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortByName, sortByPrice } from '../../redux/actions/goodsActions'

const SortPanel = () => {
  const dispatch = useDispatch()

  const { orderByName } = useSelector((s) => s.products)
  const { orderByPrice } = useSelector((s) => s.products)

  return (
    <div>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-1 py-2 rounded-md text-sm font-medium"
        onClick={() => dispatch(sortByName())}
      >
        {orderByName < 0
          ? <div>Название ▲</div>
          : <div>Название ▼</div>}
      </button>
      <button
        type="button"
        className="text-gray-300 hover:bg-gray-700 hover:text-white active:bg-green-700 px-1 py-2 rounded-md text-sm font-medium"
        onClick={() => dispatch(sortByPrice())}
      >
        {orderByPrice < 0
          ? <div>Цена ▲</div>
          : <div>Цена ▼</div>}
      </button>
    </div>
  )
}

export default SortPanel
