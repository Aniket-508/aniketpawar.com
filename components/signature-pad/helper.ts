const average = (a: number, b: number) => (a + b) / 2;

export const getSvgPathFromStroke = (points: number[][]) => {
  const len = points.length;

  if (len < 4) {
    return "";
  }

  const [startA, startB, startC] = points;

  let result = `M${startA[0].toFixed(2)},${startA[1].toFixed(2)} Q${startB[0].toFixed(2)},${startB[1].toFixed(
    2
  )} ${average(startB[0], startC[0]).toFixed(2)},${average(startB[1], startC[1]).toFixed(2)} T`;

  for (let i = 2, max = len - 1; i < max; i += 1) {
    const pointA = points[i];
    const pointB = points[i + 1];
    result += `${average(pointA[0], pointB[0]).toFixed(2)},${average(pointA[1], pointB[1]).toFixed(2)} `;
  }

  return `${result}Z`;
};
