const { coThunk, coPromise } = require('./my-co');


const asyncFn = (x) => {
  return (cb) => {
    const data = x + 1;
    setTimeout(() => {
      cb && cb(data);
    }, 1000)
  }
}

const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

const gen = function* (x) {
  const a = yield asyncFn(x);
  console.log(a);

  const b = yield asyncFn(a);
  console.log(b);

  const c = yield asyncFn(b);
  console.log(c);

  const d = yield asyncFn(c);
  console.log(d);

  console.log('done');
}

const genP = function* () {
  const data1 = yield asyncPromise(1);
  console.log(data1);

  const data2 = yield asyncPromise(data1);
  console.log(data2);

  const data3 = yield asyncPromise(data2);
  console.log(data3);
}

// coThunk(gen, 1);
coPromise(genP).then((data) => {
  setTimeout(() => {
    console.log(data + 1);
  }, 1000)
});
