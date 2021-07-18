/* eslint-disable import/no-anonymous-default-export */
import t from '../types/goodsActionTypes'

const getCartFromLocalStorage = () => {
  let cart
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || {}
  } catch (e) {
    cart = {}
  }
  return cart
}

const initialState = {
  productList: [],
  cartList: { ...getCartFromLocalStorage() },
  exchangeRates: {},
  currentСurrency: ['1', '$'],
  orderByName: 1,
  orderByPrice: 1,
  searchValue: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_PRODUCTS:
      return {
        ...state,
        productList: action.prod
      }
    case t.GET_RATES:
      return {
        ...state,
        exchangeRates: action.rates
      }
    case t.SET_CURRENCY:
      return {
        ...state,
        currentСurrency: action.cur
      }
    case t.SORT_BY_NAME:
      return {
        ...state,
        productList: action.prod,
        orderByName: action.nameOrder,
        cartList: { ...action.cart }
      }
    case t.SORT_BY_PRICE:
      return {
        ...state,
        productList: action.prod,
        orderByPrice: action.priceOrder,
        cartList: { ...action.cart }
      }
    case t.ADD_TO_CART:
      localStorage.setItem('cart', JSON.stringify(action.list))
      return {
        ...state,
        cartList: { ...action.list }
      }
    case t.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.value
      }
    default:
      return state
  }
}
