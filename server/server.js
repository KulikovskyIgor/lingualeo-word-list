const express = require("express");
const fs = require("fs");
const sqlite = require("../node_modules/sql.js/js/sql");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const wordParsers = require('./parsers/word');
const lingualeoAPI = require('./api/lingualeo');

const filebuffer = fs.readFileSync("db/usda-nnd.sqlite3");
const db = new sqlite.Database(filebuffer);
const app = express();


app.use(bodyParser.json());
app.use(fileUpload());
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];
app.get("/api/food", (req, res) => {
  const param = req.query.q;

  if (!param) {
    res.json({
      error: "Missing required parameter `q`"
    });
    return;
  }

  // WARNING: Not for production use! The following statement
  // is not protected against SQL injections.
  const r = db.exec(
    `
    select ${COLUMNS.join(", ")} from entries
    where description like '%${param}%'
    limit 100
  `
  );

  if (r[0]) {
    res.json(
      r[0].values.map(entry => {
        const e = {};
        COLUMNS.forEach((c, idx) => {
          // combine fat columns
          if (c.match(/^fa_/)) {
            e.fat_g = e.fat_g || 0.0;
            e.fat_g = (parseFloat(e.fat_g, 10) +
              parseFloat(entry[idx], 10)).toFixed(2);
          } else {
            e[c] = entry[idx];
          }
        });
        return e;
      })
    );
  } else {
    res.json([]);
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  lingualeoAPI.login(email, password)
    .then(data => res.json(data))
    .catch(e => res.error(e.message));
});

app.post("/api/addword", (req, res) => {
  const { word, translation } = req.body;

  lingualeoAPI.addWord(word, translation)
    .then(data => res.json(data))
    .catch(e => res.error(e.message));
});

app.post("/api/addwords", (req, res) => {
  const words = wordParsers.getParsedWords(req.files.file.data.toString());

  const addWordRequests = words.map(word => lingualeoAPI.addWord(word.word, word.translation));

  Promise.all(addWordRequests)
    .then(data => res.json(data))
    .catch(e => res.error(e.message));
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
