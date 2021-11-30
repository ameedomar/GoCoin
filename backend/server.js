var express = require("express");
var app = express();
const cors = require("cors");
var mysql = require("mysql");
var bodyParser = require("body-parser");
require("dotenv").config();

var bcrypt = require("bcrypt");
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ limit: "50mb", extended: "true" }));

app.use(express.json());

app.use(cors());

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  port: process.env.MY_SQL_PORT || "3306",
  user: "root",
  password: "", //empty for window
  database: "gocoin1",
});

// connect to the database
con.connect(function (error) {
  if (error) console.log("DB connection Error ", error);
  else console.log("connected to db");
});

const hostname = "192.168.10.184";
const port = process.env.PORT || "53710";
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const USER_TABLE_NAME = "signupuser";

function setUp() {
  // if table not exist create table
}
//request
app.get("/user", function (req, res) {
  // Connecting to the database.
  // Executing the MySQL query (select all data from the 'signupuser' table).
  con.query(
    `SELECT * FROM ${USER_TABLE_NAME}`,
    function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.

      res.send(results);
      console.log(results);
    }
  );
});

//----------------------------------------------------SignUp
//res:send sth to the frontend
//req:take sth from frontend
app.post("/signupuser", function (req, res) {
  //the text fields names
  var fullName = req.body.fullName;
  var emailAdd = req.body.emailAdd;
  var username = req.body.username;
  var password = req.body.password;
  console.log(fullName);

  if (fullName && emailAdd && username && password) {
    con.query(
      `INSERT INTO signupuser (full_name,email,username,password) VALUES (?,?,?,?)`,
      [fullName, emailAdd, username, password],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(fullName);
        }
      }
    );
  } else {
    res.send({
      error: " Values Are not filled , some parameters are missing ",
    });
  }
});
//----------------------------------------------------Login
app.post("/login", function (req, res) {
  var email = req.body.email; //value from textfield
  var username = req.body.username; //value from textfield
  var password1 = req.body.password; //value from textfield
  if (email && password1) {
    console.log(email);
    // if user fill all text input
    con.query(
      "SELECT * FROM signupuser where  email=?", //update
      [email],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }

        if (result.length > 0) {
          res.send(result);
          console.log("l");
        } else {
          res.send({
            error: " Values Are not filled , some parameters are missing ",
          });
          console.log("wrong combination");
        }
      }
    );
  }
});
//-----------------------------------------------income
app.post("/income", function (req, res) {
  var income = req.body.income; //value from textfield
  var email = req.body.email; //value from textfield
  console.log(income);
  con.query(
    `INSERT INTO income (email,income) VALUES (?,?) `,
    [email, income],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(fullName);
      }
    }
  );
});

// Activaite IF Statment in LoginScreen

// APIs for Incomte to [add , update , delete]
app.post("/addIncome", function (req, res) {
  const amount = req.body.amount;
  const date = req.body.date;
  const note = req.body.note;
  const userid = req.body.userid;

  con.query(
    `INSERT INTO Transactions
       (id,userid,amount,date,note) 
      VALUES (null,?,?,?,?)`,
    [userid, amount, date, note],
    (err, qres) => {
      if (err) {
        console.log(err);
        res.status(500).send({ err });
      } else {
        console.log(qres);
        res.send(qres);
      }
    }
  );
});

app.post("/updateIncome", function (req, res) {
  const amount = req.body.amount;
  const date = req.body.date;
  const note = req.body.note;
  const username = req.body.username;
});

app.delete("/deleteIncome", function (req, res) {});
/************************************************************************* */
// APIs for Outcome to [add , update , delete]
app.post("/addOutcome", function (req, res) {
  const amount = req.body.amount;
  const date = req.body.date;
  const cateogry = req.body.cateogry;
  const note = req.body.note;
  const username = req.body.username;

  con.query(
    `INSERT INTO Transactions (username,amount,cateogry,date,note) VALUES (?,?,?,?,?)`,
    [amount, date, cateogry, note, username],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(amount);
      }
    }
  );
});

app.post("/updateOutcome", function (req, res) {
  const amount = req.body.amount;
  const date = req.body.date;
  const cateogry = req.body.cateogry;
  const note = req.body.note;
  const username = req.body.username;
});

app.delete("/deleteOutcome", function (req, res) {
  const amount = req.body.amount;
  const date = req.body.date;
  const cateogry = req.body.cateogry;
  const note = req.body.note;
  const username = req.body.username;
});

// APIs to control Period Time
// app.get("/periodDate", { startDate, endDate }, function (req, res) {});

/***
 *
 *
 *  .post(/addIncome) { amount, date ,note ,userName }== > id تخزن بعد الحفظ
 *  .post(/addExpense)  { amount, date ,cateogry,note ,userName }
 *  .post(/updateExpense)
 *  .post(/updateincome/:id) { amount, date , note ,userName }
 *  .post(/deleteExpense)
 *  .delete(/deleteIncome/:id)  ex: deleteIncome/5
 *
 *
 *
 *  .get(/periodDate, {startDate,endDate})
 */

/***
 *  شكل الداتا في الداتا بيس
 *  Transaction اسم التيبل
 *  id  date        amount  categoryId type[Outcome/income] userName note اسماء الكولمنز
 *  1   29/11/2021   1000    salary    income                ameed
 *  2   29/11/2021   100     grocery   expense               ameed
 *  3   29/11/2021   100     grocery   expense               ameed    botato
 *  4   29/11/2021   100     grocery   expense               ameed
 *  5   29/11/2021   100     grocery   expense               ameed    cola
 *  6   29/11/2021   100     grocery   expense               ameed
 *  7   29/11/2021   100     grocery   expense               ameed
 *  8   29/11/2021   100     grocery   expense               ameed
 *
 */

/**
 *
 *  .get(/periodDate, {startDate: 29/11/2021,endDate: 30/11/2021,userName:"ameed"})
 *
 *   [{id:0, date, amount 1000, type:"income", userName}]
 *
 */
