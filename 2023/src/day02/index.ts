import run from "aocrunner"

type Color = "red" | "green" | "blue"

const MAX_RED_COUNT = 12
const MAX_GREEN_COUNT = 13
const MAX_BLUE_COUNT = 14

const parseInput = (rawInput: string) => rawInput.split("\n")

function parseGame(value: string): number {
  const match = value.match(/\d+/)

  if (match) {
    return parseInt(match[0])
  }

  return 0
}

function parseSet(value: string) {
  const colors: Color[] = ["red", "green", "blue"]
  const result: Record<Color, number> = {
    red: 0,
    green: 0,
    blue: 0,
  }

  colors.forEach((color) => {
    const regex = new RegExp(`(\\d+) ${color}`)
    const match = value.match(regex)

    if (match) {
      result[color] = parseInt(match[1])
    }
  })

  return result
}

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  let result = 0

  lines.forEach((line) => {
    const linesSplitByDot = line.split(":")

    for (let i = 0; i < linesSplitByDot.length; i++) {
      const game = linesSplitByDot[i]
      const sets = linesSplitByDot[i + 1]
      let isPossible = true

      if (!game || !sets) continue

      sets.split(";").forEach((set) => {
        const { red, green, blue } = parseSet(set)

        if (
          red > MAX_RED_COUNT ||
          green > MAX_GREEN_COUNT ||
          blue > MAX_BLUE_COUNT
        ) {
          isPossible = false

          return
        }
      })

      if (isPossible) {
        result += parseGame(game)
      }
    }
  })

  return result
}

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  let result = 0

  lines.forEach((line) => {
    const linesSplitByDot = line.split(":")

    for (let i = 0; i < linesSplitByDot.length; i++) {
      const game = linesSplitByDot[i]
      const sets = linesSplitByDot[i + 1]
      let minRed = 1
      let minGreen = 1
      let minBlue = 1

      if (!game || !sets) continue

      sets.split(";").forEach((set) => {
        const { red, green, blue } = parseSet(set)

        if (red > minRed) {
          minRed = red
        }

        if (green > minGreen) {
          minGreen = green
        }

        if (blue > minBlue) {
          minBlue = blue
        }
      })

      result += minRed * minGreen * minBlue
    }
  })

  return result
}

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
