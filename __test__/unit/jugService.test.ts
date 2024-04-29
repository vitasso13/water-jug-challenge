import processJug from "../../src/services/jugService";
import { Step } from "../../src/mapping/stepType";

describe("tests jugService.ts", () => {
  test("Solves the problem correctly for x=2, y=10, z=4", () => {
    const result = processJug(2, 10, 4);
    expect(result.length).toBe(4);
    expect((result[result.length - 1] as Step).status).toEqual("Solved");
    expect((result[result.length - 1] as Step).bucketY).toEqual(4);
    console.log(result)
    expect(result).toStrictEqual([
      {
        step: 1,
        bucketX: 2,
        bucketY: 0,
        action: "Fill bucket X",
      },
      {
        step: 2,
        bucketX: 0,
        bucketY: 2,
        action: "Transfer from bucket X to Y",
      },
      {
        step: 3,
        bucketX: 2,
        bucketY: 2,
        action: "Fill bucket X",
      },
      {
        step: 4,
        bucketX: 0,
        bucketY: 4,
        action: "Transfer from bucket X to Y",
        status: "Solved",
      },
    ]);
  });

  test("Solves the problem correctly for x=2, y=100, z=96", () => {
    const result = processJug(2, 100, 96);
    expect(result.length).toBe(4);
    expect((result[result.length - 1] as Step).status).toEqual("Solved");
    expect((result[result.length - 1] as Step).bucketY).toEqual(96);
    expect(result).toStrictEqual([
      {
        step: 1,
        bucketX: 0,
        bucketY: 100,
        action: "Fill bucket Y",
      },
      {
        step: 2,
        bucketX: 2,
        bucketY: 98,
        action: "Transfer from bucket Y to X",
      },
      {
        step: 3,
        bucketX: 0,
        bucketY: 98,
        action: "Empty bucket X",
      },
      {
        step: 4,
        bucketX: 2,
        bucketY: 96,
        action: "Transfer from bucket Y to X",
        status: "Solved",
      },
    ]);
  });

  test("Solves the problem with no solution for x=2, y=6, z=5", () => {
    const result = processJug(2, 6, 5);
    expect(result).toBe("No solution possible");
  });

  test('Returns "No solution possible" for unsolvable cases', () => {
    const result = processJug(3, 5, 8);
    expect(result).toBe("No solution possible");
  });
});
