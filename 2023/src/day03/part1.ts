enum CharType {
  DOT = 0,
  SYMBOL,
  DIGIT,
}

interface MatrixValue {
  c: string
  type: CharType
}

type Matrix = MatrixValue[][]

function hasAdjacentSymbol({
  matrix,
  digitStartX,
  digitEndX,
  y,
}: {
  matrix: Matrix
  digitStartX: number
  digitEndX: number
  y: number
}): boolean {
  const prevRow = matrix[y - 1] ?? []
  const nextRow = matrix[y + 1] ?? []

  const adjacentTiles: Array<MatrixValue | undefined> = [
    prevRow[digitStartX - 1],
    matrix[y][digitStartX - 1],
    nextRow[digitStartX - 1],

    prevRow[digitEndX + 1],
    matrix[y][digitEndX + 1],
    nextRow[digitEndX + 1],
  ]

  for (let i = 0; i <= digitEndX - digitStartX; i++) {
    adjacentTiles.push(prevRow[digitStartX + i], nextRow[digitStartX + i])
  }

  return adjacentTiles
    .map((matrixValue) => matrixValue?.type)
    .includes(CharType.SYMBOL)
}

function parseNumber({
  row,
  digitStartX,
  digitEndX,
}: {
  row: MatrixValue[]
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

export const part1 = (rawInput: string) => {
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
        c,
        type:
          c === "."
            ? CharType.DOT
            : c.match(digitRegEx)
            ? CharType.DIGIT
            : CharType.SYMBOL,
      }
    }
  })

  matrix.forEach((row, y) => {
    let digitStartX = -1
    let digitEndX = -1
    let lastCharType = CharType.DIGIT

    const checkMatrix = (x: number) => {
      if (digitStartX >= 0) {
        digitEndX = x - 1

        if (
          hasAdjacentSymbol({
            matrix,
            digitStartX,
            digitEndX,
            y,
          })
        ) {
          result += parseNumber({
            row,
            digitStartX,
            digitEndX,
          })
        }

        digitStartX = -1
        digitEndX = -1
      }
    }

    for (let x = 0; x < row.length; x++) {
      const col = row[x]

      lastCharType = col.type

      switch (col.type) {
        case CharType.DIGIT:
          if (digitStartX < 0) {
            digitStartX = x
          }
          break

        case CharType.DOT:
        case CharType.SYMBOL:
          checkMatrix(x)
          break
      }
    }

    if (lastCharType === CharType.DIGIT) {
      checkMatrix(row.length)
    }
  })

  return result
}
