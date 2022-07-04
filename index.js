const express = require("express");
const cors = require("cors");
const { async } = require("jshint/src/prod-params");
const req = require("express/lib/request");
const res = require("express/lib/response");
const pool = require("pg").Pool;

//Database Connection:
const db = new pool({
  user: "hamza-707",
  password: "dbpassword",
  host: "localhost",
  port: 5432,
  database: "todo-list-db",
});

//Middleware:
const app = express();
app.use(cors());
app.use(express.json());

//Create a new todo assosciated with this userID:
app.post("/todo/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const { title, content, date } = req.body;
    const result = await db.query(
      "INSERT INTO todo (title, content, user_ID, completed, date) VALUES($1, $2, $3, false, $4);",
      [title, content, userID, date]
    );
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//Create a new user:
app.post("/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(
      `INSERT INTO "user" (email, password) VALUES($1, $2);`,
      [email, password]
    );
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//Get Todos for given dates and user_id
app.get("/todo/:user_id/:start_date/:end_date", async (req, res) => {
  try {
    const { user_id, start_date, end_date } = req.params;
    const result = await db.query(
      "SELECT * FROM todo WHERE user_id = $1 AND completed = false AND date BETWEEN $2 AND $3 ORDER BY date ASC, todo_id ASC;",
      [user_id, start_date, end_date]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

//Login User:
app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(
      `SELECT * FROM "user" WHERE email = $1 AND password = $2;`,
      [email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//Edit specific Todo / Mark specific Todo Complete:
app.put("/todo/:todo_id", async (req, res) => {
  try {
    const { todo_id } = req.params;
    const { title, content, completed, date } = req.body;
    const result = await db.query(
      `UPDATE todo SET title = $1, content = $2, completed = $3, date = $4 WHERE todo_id = $5;`,
      [title, content, completed, date, todo_id]
    );
    res.json("Edited Todo");
  } catch (err) {
    console.log(err);
  }
});

//Deletes a specific Todo:
app.delete("/todo/:todo_id", async (req, res) => {
  try {
    const { todo_id } = req.params;
    const result = await db.query(`DELETE FROM todo WHERE todo_id = $1;`, [
      todo_id,
    ]);
    res.json("Deleted Todo");
  } catch (err) {
    console.log(err);
  }
});

//Get todos report data for current user:
app.get("/todo/count/:user_id/:start_date/:end_date", async (req, res) => {
  try {
    const { user_id, start_date, end_date } = req.params;
    const result = await db.query(
      "SELECT completed, COUNT(completed) FROM todo WHERE user_id = $1 AND date BETWEEN $2 AND $3 GROUP BY completed;",
      [user_id, start_date, end_date]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log("Listening to port: 8000");
});
