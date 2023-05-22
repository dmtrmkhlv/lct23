import { nanoid } from "nanoid";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const fakeDB = [
  {
    id: nanoid(),
    email: "admin@mail.ru",
    password: "123123",
    role: "admin",
    firstName: "admin",
    lastName: "admin",
    username: "admin",
    phone: 89009009090,
  },
  {
    id: nanoid(),
    email: "curator@mail.ru",
    password: "123123",
    role: "curator",
    firstName: "curator",
    lastName: "curator",
    username: "curator",
    phone: 89009009090,
  },
  {
    id: nanoid(),
    email: "intern@mail.ru",
    password: "123123",
    role: "intern",
    firstName: "intern",
    lastName: "intern",
    username: "intern",
    phone: 89009009090,
  },
  {
    id: nanoid(),
    email: "mentor@mail.ru",
    password: "123123",
    role: "mentor",
    firstName: "mentor",
    lastName: "mentor",
    username: "mentor",
    phone: 89009009090,
  },
  {
    id: nanoid(),
    email: "hr@mail.ru",
    password: "123123",
    role: "hr",
    firstName: "hr",
    lastName: "hr",
    username: "hr",
    phone: 89009009090,
  },
  {
    id: nanoid(),
    email: "intern2@mail.ru",
    password: "123123",
    role: "intern2",
    firstName: "intern2",
    lastName: "intern2",
    username: "intern2",
    phone: 89009009090,
  },
];

app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;

  const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });

  const index = fakeDB.findIndex(
    (user) => user.email === email && user.password === password
  );

  if (index !== -1) {
    fakeDB[index].token = token;
    res.status(200).json(fakeDB[index]);
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

app.post("/api/user/current", (req, res) => {
  res.status(200).json(req.user);
});

app.get("/", (req, res) => {
  res.send("Ответ сервера");
});

app.get("/api/users", (req, res) => {
  res.status(200).json(fakeDB);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
