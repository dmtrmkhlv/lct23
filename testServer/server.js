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
  const roles = ["curator", "admin", "intern", "mentor", "hr", "candidat"];
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
    id: "b0IlYDTHYbLoHk1FGb33v",
    email: "admin@mail.ru",
    password: "123123",
    role: "admin",
    firstName: "Admin",
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
    id: "candidat",
    email: "candidat@mail.ru",
    password: "123123",
    role: "candidat",
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
      { expiresIn: "10h" }
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
});

app.get("/api/users/:id", (req, res) => {
  const userLogin = fakeDB.find((user) => {
    return user.id === req.params.id;
  });

  if (userLogin) {
    res.status(200).json(userLogin);
  } else {
    res.status(400);
    res.send("User not found");
  }
});

app.get("/api/users/apply/:id", (req, res) => {
  const userLogin = {
    isSend: false,
    status: "processing",
    id: "candidat",
    firstName: "Иван",
    lastName: "Иванов",
    secondName: "Иванович",
    gender: "man",
    city: "Москва",
    cityArea: "SAO",
    citizenship: "ru",
    study: "SPO",
    email: "ivanov@mail.ru",
    phone: "+79123456789",
    studyName: "МГТУ им. Н.Э. Баумана",
    studyCity: "Москва",
    studyFac: "Факультет информатики и систем управления",
    studySpec: "Информационные системы и технологии",
    studyEnd: "2020-05-27T16:54:02.300Z",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "ООО Рога и копыта",
        experienceDate: "2023-02-27T16:54:17.957Z",
        experienceText: "Работал программистом",
      },
      {
        experienceName: "Веселый молочник",
        experienceDate: "2023-02-27T16:54:17.957Z",
        experienceText: "Работал программистом",
      },
    ],
    internDirection: "Веб-разработка",
    internAbout:
      "Хочу получить опыт в веб-разработке и изучить новые технологии",
    internSchedule: "Полный рабочий день",
    photo: {
      file: {
        uid: "rc-upload-1612345678901-1",
      },
      fileList: [
        {
          uid: "rc-upload-1612345678901-1",
          lastModified: 1612345678901,
          lastModifiedDate: "2021-02-03T12:01:18.901Z",
          name: "photo.jpg",
          size: 12345,
          type: "image/jpeg",
          percent: 100,
          originFileObj: {
            uid: "rc-upload-1612345678901-1",
          },
        },
      ],
    },
    vk: "https://vk.com/ivanov",
    telegram: "@ivanov",
    agreement: true,
  };

  if (userLogin) {
    res.status(200).json(userLogin);
  } else {
    res.status(400);
    res.send("User not found");
  }
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
