import express from 'express'
import { getListOfGoods, getExchangeRates } from '../controllers/goodsControllers.js'

const router = express.Router()

router.get('/data', getListOfGoods)
router.get('/exchange_rates', getExchangeRates)

export default router
