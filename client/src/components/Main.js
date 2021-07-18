import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './common/ProductCard'
import { getProductList } from '../redux/actions/goodsActions'

const Main = () => {
  const dispatch = useDispatch()

  let productNames = useSelector((s) => s.products.productList)
  const currency = useSelector((s) => s.products.currentСurrency)
  const productsInCart = useSelector((s) => s.products.cartList)
  const searchValue = useSelector((s) => s.products.searchValue)

  if (searchValue !== '') {
    productNames = productNames.filter((it) =>
      it.title.toLowerCase().startsWith(searchValue.toLowerCase())
    )
  }

  useEffect(() => dispatch(getProductList()), [dispatch])

  return (
    <div className="container my-6 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <div className="grid md:grid-cols-4 gap-6 m-5 max-w-5xl m-auto sm:grid-cols-3">
          {productNames.map((it) => {
            const quantity = it.id in productsInCart ? productsInCart[it.id].quantity : 0
            return (
              <div key={it.id}>
                <ProductCard data={it} currency={currency} quantity={quantity} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Main
