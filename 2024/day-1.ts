async function part1(): Promise<number | null> {
  const input = await Bun.file("input.txt").text();
  if (!input) return null;

  const splitted = input
    .split("\n")
    .map((line) => line.split(" ").filter(Boolean));

  const obj: { left: number[]; right: number[] } = { left: [], right: [] };
  for (const [left, right] of splitted) {
    obj.left.push(+left);
    obj.right.push(+right);
  }

  const leftSorted = cSort(obj.left).filter(Boolean);
  const rightSorted = cSort(obj.right).filter(Boolean);

  return leftSorted.reduce(
    (total, left, i) => total + Math.abs(rightSorted[i] - left),
    0,
  );
}

async function part2(): Promise<number | null> {
  const readInput = Bun.file("input.txt");
  const input = await readInput.text();
  if (!input) return null;

  const splitNewLine = input.split("\n");
  let splitted: string[] = [];
  for (let i = 0; i < splitNewLine.length; i++) {
    const splitLeftRight: string = splitNewLine[i].split(" ").filter(Boolean);
    splitted.push(splitLeftRight);
  }

  let obj: { left: number[]; right: number[] } = { left: [], right: [] };
  for (let i = 0; i < splitted.length; i++) {
    const left: number = +splitted[i][0];
    const right: number = +splitted[i][1];

    obj.left.push(left);
    obj.right.push(right);
  }

  let total = 0;

  for (let i = 0; i < obj.left.length; i++) {
    const numLeft = obj.left[i];
    if (isNaN(numLeft)) {
      continue;
    }
    // or use filter
    // const appears = obj.right.filter((num) => num === numLeft).length;
    // total += numLeft * appears;
    let appears = 0;
    for (let j = 0; j < obj.right.length; j++) {
      const numRight = obj.right[j];
      if (numLeft === numRight) {
        appears++;
      }
    }

    const count = numLeft * appears;
    total += count;
  }

  return total;
}

function cSort(input: number[]) {
  return input.sort((a, b) => a - b);
}

// uncomment the function to run it
// console.log(await part1());
// console.log(await part2());
