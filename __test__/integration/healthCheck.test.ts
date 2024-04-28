import request from "supertest";
import app from "../../src/app";

describe("Water Jug Challenge API Health Check GET", () => {
  it("should check server health", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      "Health Checked. Server is running fine. Cheers! ;)"
    );
  });
});
