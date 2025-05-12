import { Pool, QueryResult } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool()

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
  return pool.query(text, params)
}
