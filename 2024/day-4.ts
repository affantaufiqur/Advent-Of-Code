async function p() {
  const input = await Bun.file("input.txt").text();
  if (!input) return null;

  const splitted = input
    .split("\n")
    .map((line: string) => line.split(" ").filter(Boolean))
    .filter((x: string[]) => x.length);

  let total = 0;

  function checkHorizontal(word: string) {
    const forward = (word.match(/XMAS/g) || []).length;
    const backward = (word.match(/SAMX/g) || []).length;
    return forward + backward;
  }

  function checkVertical(word: string[][]) {
    const flat = word.flat();

    const wordArr: string[] = [];
    for (let i = 0; i < flat.length; i++) {
      const verWord: string[] = [];
      let first = "";
      for (let j = 0; j < flat[i].length; j++) {
        first = flat[j][i];
        verWord.push(first);
      }

      wordArr.push(verWord.join(""));
    }

    return wordArr;
  }

  function checkDiagonal(word: string[][]) {
    const w = word.flat();
    const height = w.length;
    const width = w[0].length;
    const diagonals: string[] = [];

    for (let i = 0; i < height; i++) {
      let diag: string[] = [];
      for (let j = 0; j < Math.min(height - i, width); j++) {
        diag.push(w[i + j][j]);
      }
      if (diag.length) diagonals.push(diag.join(""));
    }

    for (let i = 0; i < height; i++) {
      let diag: string[] = [];
      for (let j = 0; j < Math.min(height - i, width); j++) {
        diag.push(w[i + j][width - 1 - j]);
      }
      if (diag.length) diagonals.push(diag.join(""));
    }

    for (let i = 1; i < width - 1; i++) {
      let diag1: string[] = [];
      let diag2: string[] = [];
      for (let j = 0; j < Math.min(height, width - i); j++) {
        diag1.push(w[j][i + j]);
      }
      for (let j = 0; j < Math.min(height, i + 1); j++) {
        diag2.push(w[j][i - j]);
      }
      if (diag1.length) diagonals.push(diag1.join(""));
      if (diag2.length) diagonals.push(diag2.join(""));
    }

    return diagonals;
  }

  for (let i = 0; i < splitted.length; i++) {
    const word = splitted[i];
    const horizontal = checkHorizontal(word[0]);

    total += horizontal;
  }

  const vertical = checkVertical(splitted);

  for (let i = 0; i < vertical.length; i++) {
    const word = vertical[i];
    const horizontal = checkHorizontal(word);

    total += horizontal;
  }

  const diagonal = checkDiagonal(splitted);

  for (let i = 0; i < diagonal.length; i++) {
    const word = diagonal[i];
    const horizontal = checkHorizontal(word);

    total += horizontal;
  }

  return total;
}

console.log(await p());

// gitbutler test
