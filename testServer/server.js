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
let fakeDB = [...fakeDBStart, ...USERS];
// console.log([...fakeDB, ...USERS]);

let usersApply = [
  {
    isSend: false,
    status: "processing",
    id: "candidat",
    firstName: "Иван",
    lastName: "Иванов",
    secondName: "Иванович",
    age: 25,
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
  },
  {
    isSend: true,
    id: "12345",
    firstName: "John",
    lastName: "Doe",
    secondName: "Michael",
    age: 25,
    gender: "man",
    city: "Moscow",
    cityArea: "CAO",
    citizenship: "ru",
    study: "SOO",
    email: "john.doe@example.com",
    phone: "555-555-5555",
    studyName: "Example University",
    studyCity: "Moscow",
    studyFac: "Faculty of Science",
    studySpec: "Computer Science",
    studyEnd: "2022-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Company",
        experienceDate: "2020-01-01",
        experienceText: "Worked as a software engineer",
      },
    ],
    internDirection: "Software Engineering",
    internAbout:
      "Looking for an opportunity to gain experience in software development",
    internSchedule: "Flexible",
    photo: {
      file: { uid: "12345" },
      fileList: [
        {
          uid: "12345",
          name: "example.jpg",
          size: 10000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "12345" },
        },
      ],
    },
    vk: "https://vk.com/johndoe",
    telegram: "@johndoe",
    agreement: true,
  },
  {
    isSend: false,
    id: "67890",
    firstName: "Jane",
    lastName: "Smith",
    secondName: "",
    age: 26,
    gender: "woman",
    city: "Saint Petersburg",
    cityArea: "Vasilievsky Island",
    citizenship: "notru",
    study: "SPO",
    email: "jane.smith@example.com",
    phone: "555-555-5556",
    studyName: "Example Polytechnic",
    studyCity: "Saint Petersburg",
    studyFac: "Faculty of Engineering",
    studySpec: "Mechanical Engineering",
    studyEnd: "2023-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Corporation",
        experienceDate: "2019-01-01",
        experienceText: "Interned as a mechanical engineer",
      },
    ],
    internDirection: "Mechanical Engineering",
    internAbout: "Seeking an internship in mechanical engineering",
    internSchedule: "Full-time",
    photo: {
      file: { uid: "67890" },
      fileList: [
        {
          uid: "67890",
          name: "example.jpg",
          size: 12000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "67890" },
        },
      ],
    },
    vk: "",
    telegram: "@janesmith",
    agreement: false,
  },
  {
    isSend: true,
    id: "54321",
    firstName: "David",
    lastName: "Nguyen",
    secondName: "Lee",
    age: 27,
    gender: "man",
    city: "Hanoi",
    cityArea: "Dong Da",
    citizenship: "notru",
    study: "NPO",
    email: "david.nguyen@example.com",
    phone: "555-555-5557",
    studyName: "Example University of Technology",
    studyCity: "Hanoi",
    studyFac: "Faculty of Information Technology",
    studySpec: "Information Systems",
    studyEnd: "2024-06-30",
    studyGrade: "spec",
    experience: [
      {
        experienceName: "Example Startup",
        experienceDate: "2021-01-01",
        experienceText: "Co-founded a startup that developed a mobile app",
      },
    ],
    internDirection: "Mobile App Development",
    internAbout: "Looking for an internship in mobile app development",
    internSchedule: "Part-time",
    photo: {
      file: { uid: "54321" },
      fileList: [
        {
          uid: "54321",
          name: "example.jpg",
          size: 8000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "54321" },
        },
      ],
    },
    vk: "https://vk.com/davidnguyenlee",
    telegram: "",
    agreement: true,
  },
  {
    isSend: false,
    id: "09876",
    firstName: "Mary",
    lastName: "Johnson",
    secondName: "Elaine",
    age: 28,
    gender: "woman",
    city: "New York",
    cityArea: "Manhattan",
    citizenship: "notru",
    study: "NVO",
    email: "mary.johnson@example.com",
    phone: "555-555-5558",
    studyName: "Example College",
    studyCity: "New York",
    studyFac: "Faculty of Business",
    studySpec: "Finance",
    studyEnd: "2025-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Investment Bank",
        experienceDate: "2018-01-01",
        experienceText: "Worked as an intern in investment banking",
      },
    ],
    internDirection: "Finance",
    internAbout: "Seeking an internship in finance",
    internSchedule: "Full-time",
    photo: {
      file: { uid: "09876" },
      fileList: [
        {
          uid: "09876",
          name: "example.jpg",
          size: 15000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "09876" },
        },
      ],
    },
    vk: "",
    telegram: "@maryelaine",
    agreement: false,
  },
  {
    isSend: true,
    id: "13579",
    firstName: "Michael",
    lastName: "Garcia",
    secondName: "Anthony",
    age: 29,
    gender: "man",
    city: "Los Angeles",
    cityArea: "Hollywood ",
    citizenship: "ru",
    study: "VO",
    email: "michael.garcia@example.com",
    phone: "555-555-5559",
    studyName: "Example Academy",
    studyCity: "Los Angeles",
    studyFac: "Faculty of Performing Arts",
    studySpec: "Acting",
    studyEnd: "2024-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Theatre Company",
        experienceDate: "2020-01-01",
        experienceText: "Acted in a play performed by a theatre company",
      },
    ],
    internDirection: "Acting",
    internAbout:
      "Looking for an opportunity to act in a film or television show",
    internSchedule: "Flexible",
    photo: {
      file: { uid: "13579" },
      fileList: [
        {
          uid: "13579",
          name: "example.jpg",
          size: 9000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "13579" },
        },
      ],
    },
    vk: "https://vk.com/michaelanthony",
    telegram: "@michaelgarcia",
    agreement: true,
  },
  {
    isSend: false,
    id: "24680",
    firstName: "Elizabeth",
    lastName: "Brown",
    secondName: "Ann",
    age: 30,
    gender: "woman",
    city: "London",
    cityArea: "Westminster",
    citizenship: "notru",
    study: "SPO",
    email: "elizabeth.brown@example.com",
    phone: "555-555-5560",
    studyName: "Example School of Medicine",
    studyCity: "London",
    studyFac: "Faculty of Medicine",
    studySpec: "Neurology",
    studyEnd: "2026-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Hospital",
        experienceDate: "2019-01-01",
        experienceText: "Worked as a medical intern in a hospital",
      },
    ],
    internDirection: "Neurology",
    internAbout: "Seeking an internship in neurology",
    internSchedule: "Full-time",
    photo: {
      file: { uid: "24680" },
      fileList: [
        {
          uid: "24680",
          name: "example.jpg",
          size: 11000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "24680" },
        },
      ],
    },
    vk: "",
    telegram: "@elizabethann",
    agreement: false,
  },
  {
    isSend: true,
    id: "35791",
    firstName: "Christopher",
    lastName: "Lee",
    secondName: "George",
    age: 31,
    gender: "man",
    city: "Singapore",
    cityArea: "Central Area",
    citizenship: "notru",
    study: "SOO",
    email: "christopher.lee@example.com",
    phone: "555-555-5561",
    studyName: "Example Institute of Technology",
    studyCity: "Singapore",
    studyFac: "Faculty of Computer Science",
    studySpec: "Artificial Intelligence",
    studyEnd: "2023-06-30",
    studyGrade: "spec",
    experience: [
      {
        experienceName: "Example Technology Company",
        experienceDate: "2021-01-01",
        experienceText: "Worked as a software engineer in a technology company",
      },
    ],
    internDirection: "Artificial Intelligence",
    internAbout: "Looking for an internship in artificial intelligence",
    internSchedule: "Part-time",
    photo: {
      file: { uid: "35791" },
      fileList: [
        {
          uid: "35791",
          name: "example.jpg",
          size: 10000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "35791" },
        },
      ],
    },
    vk: "",
    telegram: "@christophergeorge",
    agreement: true,
  },
  {
    isSend: false,
    id: "46802",
    firstName: "Lily",
    lastName: "Chen",
    secondName: "",
    age: 36,
    gender: "woman",
    city: "Shanghai",
    cityArea: "Huangpu",
    citizenship: "notru",
    study: "SPO",
    email: "lily.chen@example.com",
    phone: "555-555-5562",
    studyName: "Example University",
    studyCity: "Shanghai",
    studyFac: "Faculty of Law",
    studySpec: "International Law",
    studyEnd: "2025-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Law Firm",
        experienceDate: "2018-01-01",
        experienceText: "Worked as a paralegal in a law firm",
      },
    ],
    internDirection: "International Law",
    internAbout: "Seeking an internship in international law",
    internSchedule: "Full-time",
    photo: {
      file: { uid: "46802" },
      fileList: [
        {
          uid: "46802",
          name: "example.jpg",
          size: 13000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "46802" },
        },
      ],
    },
    vk: "",
    telegram: "@lilychen",
    agreement: false,
  },
  {
    isSend: true,
    id: "57913",
    firstName: "William",
    lastName: "Miller",
    secondName: "Henry",
    age: 18,
    gender: "man",
    city: "Chicago",
    cityArea: "Downtown",
    citizenship: "ru",
    study: "NVO",
    email: "william.miller@example.com",
    phone: "555-555-5563",
    studyName: "Example School of Business",
    studyCity: "Chicago",
    studyFac: "Faculty of Economics",
    studySpec: "Marketing",
    studyEnd: "2024-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Advertising Agency",
        experienceDate: "2020-01-01",
        experienceText: "Worked as an intern in an advertising agency",
      },
    ],
    internDirection: "Marketing",
    internAbout: "Looking for an internship in marketing",
    internSchedule: "Flexible",
    photo: {
      file: { uid: "57913" },
      fileList: [
        {
          uid: "57913",
          name: "example.jpg",
          size: 9500,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "57913" },
        },
      ],
    },
    vk: "https://vk.com/williamhenry",
    telegram: "@williammiller",
    agreement: true,
  },
  {
    isSend: false,
    id: "68024",
    firstName: "Isabella",
    lastName: "Taylor",
    secondName: "Sophia",
    age: 38,
    gender: "woman",
    city: "Sydney",
    cityArea: "Central Business District",
    citizenship: "notru",
    study: "VO",
    email: "isabella.taylor@example.com",
    phone: "555-555-5564",
    studyName: "Example Conservatorium",
    studyCity: "Sydney",
    studyFac: "Faculty of Music",
    studySpec: "Piano Performance",
    studyEnd: "2025-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Orchestra",
        experienceDate: "2019-01-01",
        experienceText: "Performed with an orchestra as a pianist",
      },
    ],
    internDirection: "Music Performance",
    internAbout: "Looking for an opportunity to perform as a pianist",
    internSchedule: "Flexible",
    photo: {
      file: { uid: "68024" },
      fileList: [
        {
          uid: "68024",
          name: "example.jpg",
          size: 10000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "68024" },
        },
      ],
    },
    vk: "",
    telegram: "@isabellasophia",
    agreement: false,
  },
  {
    isSend: true,
    id: "79135",
    firstName: "Daniel",
    lastName: "Martinez",
    secondName: "Paul",
    age: 35,
    gender: "man",
    city: "Madrid",
    cityArea: "Centro",
    citizenship: "ru",
    study: "SOO",
    email: "daniel.martinez@example.com",
    phone: "555-555-5565",
    studyName: "Example Business School",
    studyCity: "Madrid",
    studyFac: "Faculty of Management",
    studySpec: "Entrepreneurship",
    studyEnd: "2023-06-30",
    studyGrade: "spec",
    experience: [
      {
        experienceName: "Example Startup Accelerator",
        experienceDate: "2021-01-01",
        experienceText: "Participated in a startup accelerator program",
      },
    ],
    internDirection: "Entrepreneurship",
    internAbout: "Looking for an internship in entrepreneurship",
    internSchedule: "Part-time",
    photo: {
      file: { uid: "79135" },
      fileList: [
        {
          uid: "79135",
          name: "example.jpg",
          size: 8500,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "79135" },
        },
      ],
    },
    vk: "https://vk.com/danielpaul",
    telegram: "@danielmartinez",
    agreement: true,
  },
  {
    isSend: true,
    id: "80246",
    firstName: "Emma",
    lastName: "Jackson",
    secondName: "",
    age: 24,
    gender: "woman",
    city: "Melbourne",
    cityArea: "Central Business District",
    citizenship: "ru",
    study: "NPO",
    email: "emma.jackson@example.com",
    phone: "555-555-5566",
    studyName: "Example School of Architecture and Design",
    studyCity: "Melbourne",
    studyFac: "Faculty of Design",
    studySpec: "Graphic Design",
    studyEnd: "2026-06-30",
    studyGrade: "bak",
    experience: [
      {
        experienceName: "Example Design Agency",
        experienceDate: "2018-01-01",
        experienceText: "Worked as a graphic design intern in a design agency",
      },
      {
        experienceName: "Example Design Agency",
        experienceDate: "2018-01-01",
        experienceText: "Worked as a graphic design intern in a design agency",
      },
      {
        experienceName: "Example Design Agency",
        experienceDate: "2018-01-01",
        experienceText: "Worked as a graphic design intern in a design agency",
      },
    ],
    internDirection: "Graphic Design",
    internAbout: "Seeking an internship in graphic design",
    internSchedule: "Full-time",
    photo: {
      file: { uid: "80246" },
      fileList: [
        {
          uid: "80246",
          name: "example.jpg",
          size: 12000,
          type: "image/jpeg",
          percent: 100,
          originFileObj: { uid: "80246" },
        },
      ],
    },
    vk: "",
    telegram: "@emmajackson",
    agreement: false,
  },
];
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

app.post("/api/user/register", (req, res) => {
  const { email, password } = req.body;

  const userExist = fakeDB.find((user) => {
    return user.email === email;
  });

  if (userExist) {
    res
      .status(400)
      .json({ message: "Пользователь, с таким email уже существует" });
  } else {
    let newUser = {
      id: nanoid(),
      email: email,
      password: password,
      role: "candidat",
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    };
    fakeDB = [...fakeDB, newUser];

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
  }
});

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
    res.send("User not found2");
  }
});

app.get("/api/users/apply/:id", (req, res) => {
  const userLogin = usersApply.find((user) => {
    return user.id === req.params.id;
  });

  if (userLogin) {
    res.status(200).json(userLogin);
  } else {
    res.status(400);
    res.send("User not found1");
  }
});

app.get("/api/users-all/apply", (req, res) => {
  res.status(200).json(usersApply.filter((user) => user.isSend));
});

app.put("/api/users/edit/:id", (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  let user = fakeDB.find((u) => u.id === userId);
  let index = fakeDB.indexOf(user);

  if (index !== -1) {
    fakeDB.index = userData;
    res.status(200).json(fakeDB.index);
  } else {
    res.status(400);
    res.send("User not found1");
  }
});
app.post("/api/users/add", (req, res) => {
  let userData = req.body;
  fakeDB = [...fakeDB, userData];

  let user = fakeDB.find((u) => u.email === userData.email);
  let index = fakeDB.indexOf(user);

  if (index !== -1) {
    fakeDB.index = userData;
    res.status(200).json(fakeDB.index);
  } else {
    res.status(400);
    res.send("Error");
  }
});

app.post("/api/users/remove/:id", (req, res) => {
  const userId = req.params.id;
  let newUsers = fakeDB.filter((u) => u.id !== userId);

  fakeDB = [...newUsers];

  res.status(200).json(fakeDB);
});

app.post("/api/users/apply/add", (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  let user = usersApply.find((u) => u.id === userId);
  let index = usersApply.indexOf(user);

  if (index !== -1) {
    fakeDB.index = userData;
    res.status(200).json(usersApply.index);
  } else {
    fakeDB = [...fakeDB, userData];
    res.status(200).json(userData);
  }
});

app.post("/api/users/apply/confirm", (req, res) => {
  const userData = req.body;
  userData.userIds.forEach((id) => {
    let user = fakeDB.find((u) => u.id === id);
    let index = fakeDB.indexOf(user);
    if (index !== -1) {
      fakeDB.index.role = "intern";
    }
    console.log(fakeDB.index);
    res.status(200).json(fakeDB.index);
  });
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

  if (role === "curator") {
    return res
      .status(200)
      .json(fakeDB.filter((user) => user.role === "candidat"));
  }

  if (role === "admin") {
    return res.status(200).json(fakeDB);
  }
  res.sendStatus(403);
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
