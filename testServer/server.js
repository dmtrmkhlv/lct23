const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  const token = jwt.sign({ email }, "secretKey", { expiresIn: "1h" });

  //   res.status(200).json({
  //     id: "user.id",
  //     email: req.body.email,
  //     name: "name",
  //     token: token,
  //   });
  res.status(200).json({
    id: "string",
    email: req.body.email,
    password: req.body.password,
    role: "admin",
    firstName: "string",
    lastName: "string",
    username: "string",
    phone: 89009009090,
    token: token,
  });
});

app.get("/api/user/current", (req, res) => {
  res.status(200).json({
    id: "string",
    email: req.body.email,
    password: req.body.password,
    role: "admin",
    firstName: "string",
    lastName: "string",
    username: "string",
    phone: 89009009090,
    // token: token,
  });
});

app.get("/", (req, res) => {
  res.send("Ответ сервера");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
