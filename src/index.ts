import fs from 'fs'
import readline from 'readline'
import { insertPuzzle } from './db';

const processFile = async ({
  cb,
  skipFirst = true,
  filePath,
}: {
  cb: (s: string) => Promise<any>
  skipFirst?: boolean
  filePath: string
}): Promise<string[]> => {
  let lines: string[] = []
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  for await (const line of rl) {
    lines.push(line)
  }
  return lines.slice(skipFirst ? 1 : 0)
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