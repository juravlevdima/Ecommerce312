import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RiDeleteBinLine } from 'react-icons/ri'

import { cartAddRemove } from '../redux/actions/goodsActions'

const Cart = () => {
  const dispatch = useDispatch()

  const cartList = useSelector((s) => s.products.cartList)
  const currency = useSelector((s) => s.products.currentСurrency)

  const totalPrice = useSelector((s) => Object.values(s.products.cartList))
    .reduce((acc, it) => acc + +it.price * it.quantity * currency[0], 0)
    .toFixed(2)

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Название
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Количество
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Сумма
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(cartList).map((it) => {
                  return (
                    <tr key={it.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={it.image} alt={it.title} />
                          </div>
                          <div className="ml-4 w-44 ">
                            <div className="text-sm font-medium text-gray-900">{it.title}</div>
                            <div className="text-sm text-gray-500">
                              {(it.price * +currency[0]).toFixed(2)} {currency[1]}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="custom-number-input h-10 w-36">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              type="button"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none active:bg-red-400"
                              onClick={() => dispatch(cartAddRemove(it, 'remove'))}
                            >
                              <span className="m-auto text-2xl font-thin">−</span>
                            </button>
                            <input
                              type="number"
                              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                              value={it.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer active:bg-green-400"
                              onClick={() => dispatch(cartAddRemove(it, 'add'))}
                            >
                              <span className="m-auto text-2xl font-thin">+</span>
                            </button>
                            <button
                              type="button"
                              className="flex items-center justify-center bg-red-300 text-gray-600 hover:text-gray-700 hover:bg-red-500 h-full w-24 rounded ml-2.5 cursor-pointer active:bg-red-600"
                              onClick={() => dispatch(cartAddRemove(it, 'delete'))}
                            >
                              <RiDeleteBinLine />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="px-2 flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800 w-36">
                          {(it.quantity * it.price * +currency[0]).toFixed(2)} {currency[1]}
                        </div>
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Общая стоимость товаров в корзине:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-36">
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        {totalPrice > 0 ? (
                          <button
                            type="button"
                            className="flex items-center justify-center bg-red-400 text-gray-600 hover:text-gray-900 hover:bg-red-500 h-full w-36 rounded cursor-pointer active:bg-red-600"
                            onClick={() =>
                              dispatch(cartAddRemove({ title: '', id: 0 }, 'delete_all'))
                            }
                          >
                            <span className="m-auto font-semibold tracking-tighter">
                              Очистить корзину
                            </span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="px-2 flex text-lg leading-5 font-semibold rounded-full bg-green-100 text-green-800 w-52">
                      Итого: {totalPrice} {currency[1]}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
