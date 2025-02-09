const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // Import your Express app
const User = require("../models/userModel"); // Import the Mongoose model
require("./setup.js"); // ✅ Manually load setup.js for debugging

describe("Auth Tests", () => {
  beforeEach(async () => {
    await User.deleteMany(); // Clear the database before each test
  });

  // afterAll(async () => {
  //   await mongoose.connection.close();
  // });


  test("should create a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "mobasserazaman",
      password: "test1",
    });

    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("Registration successful");
  });

  test("should ask for different username", async () => {
    await request(app).post("/auth/register").send({
      username: "mobasserazaman",
      password: "test1",
    });
    const response = await request(app).post("/auth/register").send({
      username: "mobasserazaman",
      password: "test1",

    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Username already exists. Please use a different username.");
  });

  test("should login successfully", async () => {
    await request(app).post("/auth/register").send({
      username: "mobasserazaman",
      password: "test1",

    });
    const response = await request(app).post("/auth/login").send({
      username: "mobasserazaman",
      password: "test1",
    });

    expect(response.body.msg).toBe("Login successful");
  });

  test("should fail to login", async () => {
    await request(app).post("/auth/register").send({
      username: "mobasserazaman",
      password: "test1",

    });
    const response = await request(app).post("/auth/login").send({
      username: "mobasserazaman",
      password: "test1234",
    });

    expect(response.body.msg).toBe("Invalid credentials");
  });
});
