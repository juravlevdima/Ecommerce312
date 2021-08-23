import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './common/ProductCard'
import { getProductList } from '../redux/actions/goodsActions'

const Main = () => {
  const dispatch = useDispatch()

  let { productList } = useSelector((s) => s.products)
  const { currentСurrency } = useSelector((s) => s.products)
  const { cartList } = useSelector((s) => s.products)
  const { searchValue } = useSelector((s) => s.products)

  if (searchValue !== '') {
    productList = productList.filter((it) =>
      it.title.toLowerCase().startsWith(searchValue.toLowerCase())
    )
  }

  useEffect(() => dispatch(getProductList()), [])

  return (
    <div className="container my-6 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <div className="grid md:grid-cols-4 gap-6 m-5 max-w-5xl m-auto sm:grid-cols-3">
          {productList.map((it) => {
            const quantity = it.id in cartList
              ? cartList[it.id].quantity
              : 0

            return (
              <div key={it.id}>
                <ProductCard data={it} currency={currentСurrency} quantity={quantity} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Main
