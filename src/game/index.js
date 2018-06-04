export const Suits = { d: 'SuitDiamonds', c: 'SuitClubs', h: 'SuitHearts', s: 'SuitSpades' };
export const Ranks = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const shuffle = (array) => {
  const local = [...array];
  const copy = [];
  let n = array.length;
  let i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in local) {
      copy.push(local[i]);
      delete local[i];
      n -= 1;
    }
  }

  return copy;
};

export const getDeck = () =>
  shuffle(
    Ranks
      .map(r => Object.keys(Suits).map(s => (r + s).toUpperCase()))
      .reduce((prev, curr) => prev.concat(curr)),
  );
