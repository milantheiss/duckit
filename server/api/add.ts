import { getQuery, readBody, defineEventHandler } from 'h3'
import { add } from '../lib/firestore'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const body = await readBody(event)

    const docRef = await add(query.col as string, body)

    return { result: docRef }
  } catch (error: any) {
    return { error: error.message }
  }
})
