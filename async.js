const { coPromise } = require('my-co');

// 使用 es6 async
const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

async function fn () {
  const data = await asyncPromise(1);
  console.log(data);
}
fn();

// => 转化成 generator

function* gen() {
  const data = yield asyncPromise(1);
  console.log(data);
}

coPromise(gen);