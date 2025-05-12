import { Request, Response } from 'express'
import * as db from '../db'

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre, decade } = req.query
    let sqlQuery = 'SELECT * FROM movies'
    const params: any[] = []
    const conditions: string[] = []

    if (genre) {
      conditions.push(`$${params.length+1} = ANY(genres)`)
      params.push(genre)
    }

    if (decade) {
      const decadeString = decade as string
      const startYear = parseInt(decadeString.replace('s', ''), 10)
      const endYear = startYear + 9

      conditions.push(`year BETWEEN $${params.length+1} AND $${params.length+2}`)
      params.push(startYear, endYear)
    }

    if (conditions.length > 0) {
      sqlQuery += ' WHERE ' + conditions.join(' AND ')
    }

    sqlQuery += ' ORDER BY title ASC'

    const result = await db.query(sqlQuery, params)
    res.status(200).json(result.rows)
    } catch (error) {
    console.error('Error fetching movies:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const addLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const sqlQuery = 'UPDATE movies SET likes = likes + 1 WHERE id = $1 RETURNING *'
    const result = await db.query(sqlQuery, [req.body.id])
    res.status(200).json({ message: 'Like added successfully' })
  } catch (error) {
    console.error('Error adding like:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

