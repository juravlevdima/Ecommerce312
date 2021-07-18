import axios from 'axios'
import { readFile } from 'fs'

export const getListOfGoods = (req, res) => {
  readFile(`${process.cwd()}/data/data.json`, { encoding: 'utf8' })
    .then((text) =>
      res.json(JSON.parse(text))
    )
}

export const getExchangeRates = (req, res) => {
  axios
    .get('https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD,RUB')
    .then(({ data }) => {
      res.json(data.rates)
    })
}
