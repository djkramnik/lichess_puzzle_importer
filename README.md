## Lichess puzzle importer

In the spirit of releasing trivial works to the public, and in case I should need this in the future,
here is a simple node script for saving lichess puzzles to a postgres database. 

### Download puzzles
You can download lichess puzzles here: https://database.lichess.org/#puzzles

### Unpacking puzzles 

`unzstd lichess_db_puzzle.csv.zst`

### Create table in db

Run `lichess_puzzles.sql`

### Set env variables 

In your `.env` file, set `PG_CONNECTION_STRING` and `PUZZLE_PATH` respectively

### Import the puzzles 
`npm run build && npm run start`




