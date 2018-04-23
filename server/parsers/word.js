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
      acc.push({ word: wordLineList[2], translation: wordLineList[3] });
    }
    return acc;
  }, []);
};

exports.getParsedWords = getParsedWords;