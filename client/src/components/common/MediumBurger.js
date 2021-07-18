import React from 'react'

import CurrencyPanel from './CurrencyPanel'
import SortPanel from './SortPanel'

const MediumBurger = () => {
  return (
    <div className="px-2 pt-2 pb-3 space-y-1">
      <span className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
        <SortPanel />
        <CurrencyPanel />
      </span>
    </div>
  )
}

export default MediumBurger
