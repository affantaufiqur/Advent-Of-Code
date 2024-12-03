async function p() {
  const read = (await Bun.file("input.txt").text()) as string;
  if (!read) return null;

  const regex = /mul\(\d+,\d+\)/g;
  const m = read.match(regex);

  if (!m) return null;

  let total = 0;
  for (let i = 0; i < m.length; i++) {
    const word = m[i];
    const getNumber = word.match(/\d+/g);

    const [a, b] = getNumber!.map((x) => parseInt(x));
    const mul = a * b;
    total += mul;
  }
  return total;
}

async function p2() {
  const read = (await Bun.file("input.txt").text()) as string;
  if (!read) return null;

  const controlRegex = /(do|don't)\(\)/g;
  const controls = [...read.matchAll(controlRegex)]
    .map((match) => ({
      type: match[1],
      position: match.index!,
    }))
    .sort((a, b) => b.position - a.position);

  const mulRegex = /mul\((\d+),(\d+)\)/g;
  const multiplications = [...read.matchAll(mulRegex)].map((match) => ({
    nums: [parseInt(match[1]), parseInt(match[2])],
    position: match.index!,
  }));

  let sum = 0;
  let doIns = true;

  for (let i = 0; i < multiplications.length; i++) {
    const controlBefore = controls.find(
      (c) => c.position < multiplications[i].position,
    );

    if (controlBefore) {
      doIns = controlBefore.type === "do";
    }

    if (doIns) {
      const [a, b] = multiplications[i].nums;
      sum += a * b;
    }
  }

  return sum;
}

// console.log(await p());
// console.log(await p2());
