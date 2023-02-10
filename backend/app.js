const { request } = require("express");
const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs");

app.use(
  session({
    secret: "secret code",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 쿠기 유효시간 : 1 시간
    },
  })
);

app.use(express.static("dist"));

app.use(
  express.json({
    limit: "50mb",
  })
);

const server = app.listen(3000, () => {
  console.log("Server started.");
});

var sql = require("./sql.js");

// sql.js 파일 변경해도 서버 재시작 없이 반영될 수 있도록 함
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

const db = {
  database: "odin-dairy",
  connectionLimit: 10,
  host: "svc.gksl2.cloudtype.app",
  user: "root",
  password: "root",
  port: "30071",
};

const dbPool = require("mysql").createPool(db);

app.post("/api/login", async (request, res) => {
  try {
    await req.db("signUp", request.body.param);
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0])
        request.session[key] = request.body.param[0][key];
      res.send(request.body.param[0]);
    } else {
      res.send({
        error: "Please try again or Contact system manager",
      });
    }
  } catch (err) {
    res.send({
      error: "DB access error",
    });
  }
});

app.post("/api/logout", async (request, res) => {
  request.session.destroy();
  res.send("OK");
});

app.post("/api/:alias", async (request, res) => {
  try {
    res.send(await req.db(request.params.alias, request.body.param));
  } catch (error) {
    res.status(500).send({
      error: err,
    });
  }
});

const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};
