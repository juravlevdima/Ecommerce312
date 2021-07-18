import { writeFile, readFile } from "fs"

export const getLogs = (req, res) => {
  readFile(
    `${process.cwd()}/data/logs.json`,
    { encoding: 'utf8' },
    (err, data) => {
      if (err) return res.status(400).json({ err })
      res.json(JSON.parse(data))
    })
}

export const writeLogs = (req, res) => {
  readFile(
    `${process.cwd()}/data/logs.json`,
    { encoding: 'utf8' },
    (err, data) => {
      const logs = JSON.parse(data)
      logs.push(req.body)
      writeFile(`${process.cwd()}/data/logs.json`, JSON.stringify(logs), { encoding: 'utf8' }, (err) => {
        if (err) return res.status(400).json({ err })
        res.json({ message: 'log added' })
      })
    })
}

export const clearLogs = (req, res) => {
  writeFile(
    `${process.cwd()}/data/logs.json`,
    JSON.stringify([]),
    { encoding: 'utf8' },
    (err) => {
      if (err) return res.status(400).json({ err })
      res.json({ message: 'logs cleared' })
    })
}
