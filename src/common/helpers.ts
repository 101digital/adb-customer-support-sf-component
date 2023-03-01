export const countWords = (str: string | undefined) => {
  if (!str) return 0;
  return str.split(" ").filter(function (n) {
    return n != "";
  }).length;
};

// This is a hack to stop user from inputting if input value exceeds maxWords
export const calculateMaxLength = (value: string, maxWords: number) => {
  const inputtedWords = countWords(value);
  const numForContinue = value.length + 1;
  const numForStop = value.length;
  if (inputtedWords < maxWords) {
    return numForContinue;
  }
  if (inputtedWords === maxWords) {
    if (value.substring(value.length - 1) === " ") {
      return numForStop;
    } else {
      return numForContinue;
    }
  }
  if (inputtedWords > maxWords) {
    return numForStop;
  }
};
