import axios from 'axios'
import t from '../types/goodsActionTypes'

function fromEntriesPolyfill(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}

export function getProductList() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products

    if (!productList.length) {
      axios.get(`/api/v1/data`).then(({ data }) => {
        dispatch({ type: t.GET_PRODUCTS, prod: data })
      })
    }
  }
}

export function getExchangeRates() {
  return (dispatch) => {
    axios.get(`/api/v1/exchange_rates`).then(({ data }) => {
      dispatch({ type: t.GET_RATES, rates: { ...data } })
    })
  }
}

export function setCurrentCurrency(val, char) {
  return (dispatch, getState) => {
    const store = getState()
    const { exchangeRates } = store.products
    const { currentСurrency } = store.products
    dispatch({ type: t.SET_CURRENCY, cur: [exchangeRates[val], char] })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `change currency from '${currentСurrency[1]}' to '${char}'`
      }
    })
  }
}

export function sortByName() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    const { cartList } = store.products
    const { orderByName: order } = store.products

    const productListSort = (a, b) =>
      order > 0 ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)

    const cartSort = (a, b) =>
      order > 0 ? a[1].title.localeCompare(b[1].title) : b[1].title.localeCompare(a[1].title)

    const sortedList = [...productList].sort(productListSort)
    // const sortedCart = Object.fromEntries(Object.entries(cartList).sort(cartSort))
    const sortedCart = fromEntriesPolyfill(Object.entries(cartList).sort(cartSort))

    dispatch({ type: t.SORT_BY_NAME, prod: sortedList, nameOrder: order * -1, cart: sortedCart })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `sort by name`
      }
    })
  }
}

export function sortByPrice() {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    const { cartList } = store.products
    const { orderByPrice: order } = store.products

    const productListSort = (a, b) => (order > 0 ? a.price - b.price : b.price - a.price)

    const cartSort = (a, b) => (order > 0 ? a[1].price - b[1].price : b[1].price - a[1].price)

    const sortedList = [...productList].sort(productListSort)
    // const sortedCart = Object.fromEntries(Object.entries(cartList).sort(cartSort))
    const sortedCart = fromEntriesPolyfill(Object.entries(cartList).sort(cartSort))

    dispatch({ type: t.SORT_BY_PRICE, prod: sortedList, priceOrder: order * -1, cart: sortedCart })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `sort by price`
      }
    })
  }
}

export function cartAddRemove(data, action) {
  return (dispatch, getState) => {
    const store = getState()
    const { cartList } = store.products
    const suffix = action === 'add' ? 'to' : 'from'
    let deleteAll = false

    if (action === 'add') {
      if (data.id in cartList) {
        cartList[data.id] = { ...data, quantity: (cartList[data.id].quantity += 1) }
      } else {
        cartList[data.id] = { ...data, quantity: 1 }
      }
    } else if (action === 'remove') {
      if (data.id in cartList) {
        if (cartList[data.id].quantity > 1) {
          cartList[data.id] = { ...data, quantity: (cartList[data.id].quantity -= 1) }
        } else {
          delete cartList[data.id]
        }
      }
    } else if (action === 'delete') {
      delete cartList[data.id]
    } else if (action === 'delete_all') {
      deleteAll = true
      dispatch({ type: t.ADD_TO_CART, list: {} })
    }

    if (!deleteAll) dispatch({ type: t.ADD_TO_CART, list: cartList })

    axios({
      method: 'POST',
      url: '/api/v1/logs',
      data: {
        time: JSON.stringify(Date()),
        action: `${action} '${data.title}' ${suffix} the cart`
      }
    })
  }
}

export function setSearchValue(value) {
  return { type: t.SET_SEARCH_VALUE, value }
}
