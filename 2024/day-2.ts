async function p() {
  const input = await Bun.file("input.txt").text();
  if (!input) return null;

  const splitted = input
    .split("\n")
    .map((line: string) => line.split(" ").filter(Boolean))
    .filter((x: string[]) => x.length);

  let safe = 0;
  for (let i = 0; i < splitted.length; i++) {
    if (!splitted[i] || !splitted[i].length) continue;

    let increasing = true;
    let decreasing = true;
    let inBoundary = true;

    for (let j = 0; j < splitted[i].length; j++) {
      const currentAt = +splitted[i][j];
      const nextAt = +splitted[i][j + 1];
      if (!nextAt) break;
      const maxDistance = 3;

      if (Math.abs(currentAt - nextAt) > maxDistance) {
        inBoundary = false;
        break;
      }

      if (currentAt > nextAt) {
        increasing = false;
      }

      if (currentAt < nextAt) {
        decreasing = false;
      }

      if (currentAt === nextAt) {
        increasing = false;
        decreasing = false;
        break;
      }

      if (!increasing && !decreasing) {
        break;
      }
    }

    if (!inBoundary) {
      continue;
    }

    if (increasing || decreasing) {
      safe++;
    }
  }

  return safe;
}

async function p2() {
  const input = await Bun.file("input.txt").text();
  if (!input) return null;

  const splitted = input
    .split("\n")
    .map((line: string) => line.split(" ").filter(Boolean))
    .filter((x: string[]) => x.length);

  let safe = 0;
  for (let i = 0; i < splitted.length; i++) {
    if (!splitted[i] || !splitted[i].length) continue;

    const checkSequence = (arr: number[]) => {
      let increasing = true;
      let decreasing = true;
      let inBoundary = true;

      for (let j = 0; j < arr.length - 1; j++) {
        const curr = arr[j];
        const next = arr[j + 1];
        const distance = Math.abs(curr - next);

        if (distance > 3) {
          inBoundary = false;
          break;
        }

        if (curr > next) {
          increasing = false;
        } else if (curr === next) {
          increasing = false;
          decreasing = false;
          break;
        } else {
          decreasing = false;
        }
      }

      return inBoundary && (increasing || decreasing);
    };

    let array = splitted[i].map(Number);

    if (checkSequence(array)) {
      safe++;
      splitted[i] = [];
      continue;
    }

    let possiblyValid = false;
    for (let j = 0; j < array.length; j++) {
      const tempArray = [...array.slice(0, j), ...array.slice(j + 1)];
      if (checkSequence(tempArray)) {
        possiblyValid = true;
        safe++;
        splitted[i] = [];
        break;
      }
    }
  }

  return safe;
}

// console.log(await p());
// console.log(await p2());
