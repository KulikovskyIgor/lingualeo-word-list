const express = require("express");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const wordParsers = require('./parsers/word');
const lingualeoAPI = require('./api/lingualeo');

const app = express();

app.use(bodyParser.json());
app.use(fileUpload());
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  lingualeoAPI.login(email, password)
    .then(data => res.json(data))
    .catch(e => res.error(e.message));
});

app.post("/api/addword", (req, res) => {
  const { word, translation } = req.body;
  const adaptedTranslation = wordParsers.adaptUAToRU(translation);

  lingualeoAPI.addWord(word, adaptedTranslation)
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
