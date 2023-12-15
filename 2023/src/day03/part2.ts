enum CharType {
  DEFAULT = 0,
  GEAR,
  DIGIT,
}

interface MatrixValue {
  c: string
  type: CharType
  x: number
  y: number
}

type Matrix = MatrixValue[][]

function getAdjacentDigits({
  matrix,
  x,
  y,
}: {
  matrix: Matrix
  x: number
  y: number
}): MatrixValue[] {
  const prevRow = matrix[y - 1] ?? []
  const nextRow = matrix[y + 1] ?? []

  const adjacentTiles = [
    prevRow[x - 1],
    matrix[y][x - 1],
    nextRow[x - 1],

    prevRow[x + 1],
    matrix[y][x + 1],
    nextRow[x + 1],

    prevRow[x],
    nextRow[x],
  ]

  return adjacentTiles.filter(
    (matrixValue) => matrixValue?.type === CharType.DIGIT,
  )
}

function normalizeAdjacentDigits(tiles: MatrixValue[]): MatrixValue[] {
  const tilesGroupedByY: MatrixValue[][] = []

  tiles.forEach((tile) => {
    if (tilesGroupedByY[tile.y] === undefined) {
      tilesGroupedByY[tile.y] = []
    }

    tilesGroupedByY[tile.y].push(tile)
  })

  tilesGroupedByY.forEach((group) => {
    group.sort((a, b) => {
      if (a.x < b.x) {
        return -1
      }

      if (a.x > b.x) {
        return 1
      }

      return 0
    })

    for (let i = 0; i < group.length - 1; ) {
      if (group[i].x + 1 === group[i + 1].x) {
        group.splice(i + 1, 1)
      } else {
        i++
      }
    }
  })

  return tilesGroupedByY.flat()
}

function parseNumber({
  row,
  digitStartX,
  digitEndX,
}: {
  row: readonly MatrixValue[]
  digitStartX: number
  digitEndX: number
}): number {
  let result = 0
  let power = 0

  for (let i = digitEndX; i >= digitStartX; i--, power++) {
    result += parseInt(row[i].c) * 10 ** power
  }

  return result
}

export const part2 = (rawInput: string) => {
  const lines = rawInput.split("\n")
  const matrix: Matrix = []
  const digitRegEx = /\d/
  let result = 0

  lines.forEach((line, y) => {
    line = line.trim()
    matrix[y] = []

    for (let x = 0; x < line.length; x++) {
      const c = line[x]

      matrix[y][x] = {
        x,
        y,
        c,
        type:
          c === "*"
            ? CharType.GEAR
            : c.match(digitRegEx)
            ? CharType.DIGIT
            : CharType.DEFAULT,
      }
    }
  })

  matrix.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const col = row[x]

      switch (col.type) {
        case CharType.GEAR:
          const tiles = normalizeAdjacentDigits(
            getAdjacentDigits({
              matrix,
              x,
              y,
            }),
          )

          if (tiles.length === 2) {
            let tileProduct = 1

            tiles.forEach((tile) => {
              const row = matrix[tile.y]
              let digitStartX = 0
              let digitEndX = row.length - 1

              for (let x = tile.x - 1; x >= 0; x--) {
                if (row[x].type !== CharType.DIGIT) {
                  digitStartX = x + 1

                  break
                }
              }

              for (let x = tile.x + 1; x < row.length; x++) {
                if (row[x].type !== CharType.DIGIT) {
                  digitEndX = x - 1

                  break
                }
              }

              tileProduct *= parseNumber({
                row,
                digitStartX,
                digitEndX,
              })
            })

            result += tileProduct
          }

          break
      }
    }
  })

  return result
}
