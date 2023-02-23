import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../../index";
import connectDataBase from "../../../database/connectDataBase";
import { type UserStructure } from "../../../types";
import User from "../../../database/models/User";

let server: MongoMemoryServer;
const registerUrl = "/users/login";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/users/login' endpoint", () => {
  beforeAll(async () => {
    await User.create(anotherMockUser);
  });
  const mockUser: UserStructure = {
    username: "Victour",
    password: "vic12345",
    email: "",
    avatar: "",
  };
  const anotherMockUser = {
    username: "Victour",
    password: "vic12345",
    email: "vic@gmail.com",
    avatar: "",
  };

  describe("When it receives a request with name 'Victour' and password 'vic123'", () => {
    test("Then it should respond with status 200 and a message 'Login was succesful'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Login was succesful";

      const response = await request(app)
        .post(registerUrl)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
