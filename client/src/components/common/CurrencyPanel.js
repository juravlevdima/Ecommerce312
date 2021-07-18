import React from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentCurrency } from '../../redux/actions/goodsActions'

const CurrencyPanel = () => {
  const dispatch = useDispatch()

  const backgound =
    'text-gray-300 hover:bg-gray-700 hover:text-white px-1 py-2 rounded-md text-sm font-medium active:bg-green-700'

  return (
    <div>
      <button type="button" className={backgound} onClick={() => dispatch(setCurrentCurrency('USD', '$'))}>
        USD
      </button>
      <button type="button" className={backgound} onClick={() => dispatch(setCurrentCurrency('EUR', '€'))}>
        EUR
      </button>
      <button type="button" className={backgound} onClick={() => dispatch(setCurrentCurrency('CAD', 'C$'))}>
        CAD
      </button>
      <button type="button" className={backgound} onClick={() => dispatch(setCurrentCurrency('RUB', '₽'))}>
        RUB
      </button>
    </div>
  )
}

export default CurrencyPanel
