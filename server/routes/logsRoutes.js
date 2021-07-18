import express from 'express'
import { getLogs, writeLogs, clearLogs } from '../controllers/logsControllers.js'

const router = express.Router()

router.get('/logs', getLogs)
router.post('/logs', writeLogs)
router.delete('/logs', clearLogs)

export default router
