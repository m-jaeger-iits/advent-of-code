import run from "aocrunner"
import { part1 } from "./part1.js"
import { part2 } from "./part2.js"

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361,
      },
      {
        input: `
        467....114
        +........#
        `,
        expected: 581,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835,
      },
      {
        input: `
        467.114...
        ...*......
        ..35..633.`,
        expected: 0,
      },
      {
        input: `
        ....114...
        ...*......
        .35...633.`,
        expected: 3990,
      },
      {
        input: `
        2..372.
        ..*....
        .32.785`,
        expected: 11904,
      },
      {
        input: `272*956`,
        expected: 260032,
      },
      {
        input: `
        .............286
        217.411/.879*...`,
        expected: 251394,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
