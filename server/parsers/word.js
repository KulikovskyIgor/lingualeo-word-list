const WORDS_ROW_SEPARATOR = '\n';
const WORDS_COL_SEPARATOR = ',';
const WORDS_COL_LENGTH = 4;

const getParsedWords = (words) => {
  return [...parseOneLineWord(words)];
};

const parseOneLineWord = words => {
  const wordsList = words.split(WORDS_ROW_SEPARATOR);

  return wordsList.reduce((acc, wordLine) => {
    const wordLineList = wordLine.split(WORDS_COL_SEPARATOR);

    if (wordLineList.length === WORDS_COL_LENGTH) {
      const word = wordLineList[2];
      const translation = adaptUAToRU(wordLineList[3]);
      acc.push({ word, translation });
    }
    return acc;
  }, []);
};

const adaptUAToRU = word => {
  return word.replace(/і/g, 'i');
};

exports.getParsedWords = getParsedWords;
exports.adaptUAToRU = adaptUAToRU;