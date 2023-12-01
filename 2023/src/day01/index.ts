import run from "aocrunner"

function stringReverse(str: string): string {
  return str.split("").reverse().join("")
}

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  const numberRegex = /\d/

  return lines
    .map((line) => {
      let result = ""

      for (let i = 0; i < line.length; i++) {
        const c = line[i]

        if (numberRegex.test(c)) {
          result += c
        }
      }

      return parseInt(`${result[0]}${result[result.length - 1]}`)
    })
    .reduce((acc, x) => acc + x, 0)
}

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ]
  const wordOrNumberRegExForward = new RegExp(`\\d|${numbers.join("|")}`)
  const wordOrNumberRegExBackwards = new RegExp(
    `\\d|${numbers.map(stringReverse).join("|")}`,
  )

  function matchOrDefault(match: RegExpMatchArray | null): string {
    return match ? match[0] : ""
  }

  function parseWordOrNumber(wordOrNumber: string): number {
    if (!wordOrNumber.length) return NaN

    const i = numbers.indexOf(wordOrNumber)

    return i < 0 ? parseInt(wordOrNumber) : i + 1
  }

  return lines
    .map((line) => {
      const firstMatch = parseWordOrNumber(
        matchOrDefault(line.match(wordOrNumberRegExForward)),
      )
      const lastMatch = parseWordOrNumber(
        stringReverse(
          matchOrDefault(stringReverse(line).match(wordOrNumberRegExBackwards)),
        ),
      )

      return parseInt(
        `${isNaN(firstMatch) ? "" : firstMatch}${
          isNaN(lastMatch) ? "" : lastMatch
        }`,
      )
    })
    .reduce((acc, x) => acc + x, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
          1abc2
          pqr3stu8vwx
          a1b2c3d4e5f
          treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
        `,
        expected: 281,
      },
      {
        input: `
          twone
        `,
        expected: 21,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
