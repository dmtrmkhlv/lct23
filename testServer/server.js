import { nanoid } from "nanoid";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { fakerRU as faker } from "@faker-js/faker";

const app = express();
const port = 8000;
const accessTokenSecret = "youraccesstokensecret";

const refreshTokenSecret = "yourrefreshtokensecrethere";
let refreshTokens = [];

app.use(cors());
app.use(express.json());

export function createRandomUser() {
  const roles = ["curator", "admin", "intern", "mentor", "hr"];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  return {
    id: nanoid(),
    email: faker.internet.email(),
    password: "123123",
    role: randomRole,
    firstName: faker.person.lastName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 50,
});

const fakeDBStart = [
  {
    id: nanoid(),
    email: "admin@mail.ru",
    password: "123123",
    role: "admin",
    firstName: faker.person.lastName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  },
  {
    id: nanoid(),
    email: "curator@mail.ru",
    password: "123123",
    role: "curator",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  },
  {
    id: nanoid(),
    email: "intern@mail.ru",
    password: "123123",
    role: "intern",
    firstName: faker.person.lastName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  },
  {
    id: nanoid(),
    email: "mentor@mail.ru",
    password: "123123",
    role: "mentor",
    firstName: faker.person.lastName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  },
  {
    id: nanoid(),
    email: "hr@mail.ru",
    password: "123123",
    role: "hr",
    firstName: faker.person.lastName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  },
  {
    id: nanoid(),
    email: "intern2@mail.ru",
    password: "123123",
    role: "intern",
    firstName: faker.person.lastName(),
    lastName: faker.person.lastName(),
    username: faker.internet.userName(),
    phone: faker.phone.number(),
  },
];
const fakeDB = [...fakeDBStart, ...USERS];
// console.log([...fakeDB, ...USERS]);
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;

  const userLogin = fakeDB.find((user) => {
    return user.email === email && user.password === password;
  });

  if (userLogin) {
    const accessToken = jwt.sign(
      { email: userLogin.email, role: userLogin.role },
      accessTokenSecret,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { email: userLogin.email, role: userLogin.role },
      refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    userLogin.token = accessToken;
    userLogin.refreshToken = refreshToken;

    res.status(200).json(userLogin);
  } else {
    res.status(400);
    res.send("User not found");
  }

  // res.status(200).json({
  //   id: "string",
  //   email: req.body.email,
  //   password: req.body.password,
  //   role: "admin",
  //   firstName: "string",
  //   lastName: "string",
  //   username: "string",
  //   phone: 89009009090,
  //   token: token,
  // });
});

app.get("/api/user/current", (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      const userLogin = fakeDB.find((userFromDB) => {
        return userFromDB.email === user.email;
      });

      res.status(200).json(userLogin);
    });
  } else {
    res.sendStatus(401);
  }
});

app.get("/", (req, res) => {
  res.send("Ответ сервера");
});

app.get("/api/users", authenticateJWT, (req, res) => {
  const { role } = req.user;

  if (role !== "admin") {
    return res.sendStatus(403);
  }

  res.status(200).json(fakeDB);
});

app.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

app.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.send("Logout successful");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
