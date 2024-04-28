import request from "supertest";
import app from "../../src/app"; // Import your express app
import { Step } from "../../src/mapping/stepType"; // Import your Step type from the correct file path

describe("Water Jug Challenge API Test", () => {
  it("should solve a simple water jug problem", async () => {
    const response = await request(app).post("/jug").send({
      x_capacity: 3,
      y_capacity: 5,
      z_amount_wanted: 4,
    });

    expect(response.status).toBe(200);
    expect(response.body.solution).toBeDefined();
    expect(response.body.solution.length).toBeGreaterThan(0);
    expect(
      response.body.solution[response.body.solution.length - 1].status
    ).toEqual("Solved");
  });

  it("should return steps in incremental order", async () => {
    const response = await request(app).post("/jug").send({
      x_capacity: 2,
      y_capacity: 100,
      z_amount_wanted: 96,
    });

    expect(response.status).toBe(200);
    expect(response.body.solution.map((step: Step) => step.step)).toEqual([
      1, 2, 3, 4,
    ]);
  });

it("should return no solution when impossible", async () => {
    const response = await request(app).post("/jug").send({
        x_capacity: 2,
        y_capacity: 6,
        z_amount_wanted: 5,
    });

    expect(response.status).toBe(404);
    expect(response.body.solution).toEqual("No solution possible");
});

  it("should handle invalid input with proper error", async () => {
    const response = await request(app).post("/jug").send({
      x_capacity: -1,
      y_capacity: 100,
      z_amount_wanted: 50,
    });

    expect(response.status).toBe(400); // Assuming you handle validation errors with 400 status code.
    expect(response.body.error).toBe("All parameters must be positive integers.");
  });
});
