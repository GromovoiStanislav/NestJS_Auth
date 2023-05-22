import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { DatabaseTestingModule } from "../src/database/database.testing.module";
import { UsersModule } from "../src/users/users.module";
import { CreateUserDto } from "../src/users/dto/create-user.dto";
import { HttpStatus } from "@nestjs/common";
import { AuthModule } from "../src/auth/auth.module";
import { LoginUserDto } from "../src/users/dto/login-user.dto";

describe("AuthController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestingModule, UsersModule, AuthModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await request(app.getHttpServer()).delete("/users");
    app.close();
  });

  const user: CreateUserDto = {
    username: "test",
    email: "test@test.com",
    password: "!somepassword123!"
  };

  const loginUser: LoginUserDto = {
    email: "test@test.com",
    password: "!somepassword123!"
  };

  let token: string;

  it("Create User", () => {
    return request(app.getHttpServer())
      .post("/auth/register")
      .set("Accept", "application/json")
      .send(user)
      .expect(({ body }) => {
        expect(body.userResponse.email).toEqual(user.email);
        expect(body.userResponse.username).toEqual(user.username);
        expect(body.userResponse._id).toBeDefined();
        expect(body.userResponse.password).toBeDefined();
        expect(body.token.token).toBeDefined();
        token = body.token.token;
      })
      .expect(HttpStatus.CREATED);
  });

  it("Should be authenticated", () => {
    return request(app.getHttpServer())
      .get(`/users/authstate`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(({ text }) => {
        expect(text).toBe("authenticated");
      })
      .expect(HttpStatus.OK);
  });

  it("Login user", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .set("Accept", "application/json")
      .send(loginUser)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.expiresIn).toBeDefined();
        token = body.token;
      })
      .expect(HttpStatus.CREATED);
  });

  it("Should be authenticated after login", () => {
    return request(app.getHttpServer())
      .get(`/users/authstate`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(({ text }) => {
        expect(text).toBe("authenticated");
      })
      .expect(HttpStatus.OK);
  });

  it("Should requect duplicated repo", () => {
    return request(app.getHttpServer())
      .post("/auth/register")
      .set("Accept", "application/json")
      .send(user)
      .expect(({ body }) => {
        expect(body.message).toEqual("User already exists");
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

});
