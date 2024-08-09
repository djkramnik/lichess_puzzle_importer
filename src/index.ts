import fs from 'fs'
import readline from 'readline'
import { insertPuzzle } from './db';

import dotenv from 'dotenv'
dotenv.config()

const processFile = async ({
  cb,
  skipFirst = true,
  filePath,
}: {
  cb: (s: string) => Promise<any>
  skipFirst?: boolean
  filePath: string
}): Promise<void> => {
  let lines: string[] = []
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });
  let index = 0
  for await (const line of rl) {
    if (index === 0 && skipFirst === true) {
      continue
    }
    await cb(line)
  }
}

;(async () => {
  const pathToPuzzleFile = process.env.PUZZLE_PATH
  if (!pathToPuzzleFile) {
    throw Error('set $PUZZLE_PATH env var')
  }
  if (!fs.existsSync(pathToPuzzleFile ?? '')) {
    throw Error('$PUZZLE_PATH cannot be found')
  }
  await processFile({
    filePath: pathToPuzzleFile,
    skipFirst: true,
    cb: insertPuzzle
  })
})()