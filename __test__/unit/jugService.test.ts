import jugService from "../../src/services/jugService";
import { Step } from "../../src/mapping/stepType";

describe("Water Jug Solver Function", () => {
    test("Solves the problem correctly for x=2, y=10, z=4", () => {
        const result = jugService(2, 10, 4);
        console.log(result);
        expect(result.length).toBe(4);
        expect((result[result.length - 1] as Step).status).toEqual("Solved");
        expect((result[result.length - 1] as Step).bucketY).toEqual(4);
    });

    test("Solves the problem correctly for x=2, y=100, z=96", () => {
      const result = jugService(2, 100, 96);
      console.log(result);
      expect(result.length).toBe(4);
      expect((result[result.length - 1] as Step).status).toEqual("Solved");
      expect((result[result.length - 1] as Step).bucketY).toEqual(96);
    });

    test("Solves the problem with no solution for x=2, y=6, z=5", () => {
      const result = jugService(2, 6, 5);
      console.log(result);
      expect(result).toBe("No solution possible");
    });

    test('Returns "No solution possible" for unsolvable cases', () => {
        const result = jugService(3, 5, 8);
        expect(result).toBe("No solution possible");
    });
});