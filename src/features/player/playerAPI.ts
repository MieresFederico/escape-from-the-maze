export const postMoveCount = async (moveCount: number) =>
  await fetch("https://www.mocky.io/v2/5df38f523100006d00b58560", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ moveCount }),
  }).then((res) => res.json());
