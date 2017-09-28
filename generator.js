function* gen(x) {
  const y = yield x + 1;
  console.log(y, 'here');
  return y;
}

const g = gen(1);
const value = g.next().value;

console.log(value);
console.log(g.next(value + 10));
