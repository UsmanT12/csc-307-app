import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as userService from "./services/user-service.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    userService
      .findUserByNameAndJob(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  } else if (name) {
    userService
      .findUserByName(name)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  } else if (job) {
    userService
      .findUserByJob(job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  } else {
    userService
      .getAllUsers()
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService
    .addUser(userToAdd)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService
    .deleteUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
