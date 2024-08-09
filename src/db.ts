import { z } from 'zod'
import knex from 'knex'

let dbClient: knex.Knex<any, unknown[]> | null = null
const getClient = () => {
  if (!dbClient) {
    dbClient = knex({
      client: 'pg',
      connection: process.env.PG_CONNECTION_STRING,
    })
  }
  return dbClient
}

const rowParser = z.object({
  puzzleId: z.string(),
  fen: z.string(),
  moves: z.string(),
  rating: z.number(),
  ratingDeviation: z.number(),
  popularity: z.number(),
  nbPlays: z.number(),
  themes: z.string(),
  openingTags: z.string(),
})

type LichessPuzzle = z.infer<typeof rowParser>

const parseCsvRow = (s: string): LichessPuzzle | null => {
  const [
    puzzleId,
    fen,
    moves,
    rating,
    ratingDeviation,
    popularity,
    nbPlays,
    themes,
    openingTags
  ] = s.split(',')

  const parsedRow = rowParser.safeParse({
    puzzleId,
    fen,
    moves,
    rating,
    ratingDeviation,
    popularity,
    nbPlays,
    themes,
    openingTags,
  })

  if (parsedRow.error) {
    console.warn('error', parsedRow.error)
    return null
  }
  return parsedRow.data
}

export const insertPuzzle = async (csvRow: string): Promise<boolean> => {
  const puzzle = parseCsvRow(csvRow)
  if (puzzle === null) {
    return false
  }
  const { 
    puzzleId,
    fen,
    moves,
    rating,
    ratingDeviation,
    popularity,
    nbPlays,
    themes,
    openingTags,
  } = puzzle

  try {
    const client = getClient()
    // response must be json serializable 
    await client('lichess_puzzles').insert({
      id: puzzleId,
      fen,
      moves,
      rating,
      rating_deviation: ratingDeviation,
      popularity,
      nb_plays: nbPlays,
      themes,
      opening_tags: openingTags
    })
    console.log('inserted!', puzzleId)
    return true
  } catch(e) {
    console.log('error inserting', e)
    return false
  }
}
