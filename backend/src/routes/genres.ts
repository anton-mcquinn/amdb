import { Request, Response } from 'express'
import * as db from '../db'

export const getGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlQuery = 'SELECT DISTINCT UNNEST(genres) AS genre FROM movies ORDER BY genre ASC'
    const result = await db.query(sqlQuery)
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching genres:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
