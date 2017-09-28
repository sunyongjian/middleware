
const coThunk = function (gen, ...params) {

  const g = gen(...params);
  const next = (...args) => {
    const ret = g.next(...args);
    if (!ret.done) {
      ret.value(next);
    }
  }

  next();
}

const coPromise = function (gen) {
  return new Promise((resolve, reject) => {
    const g = gen();

    const next = (data) => {
      const ret = g.next(data);
      if (ret.done) {
        resolve(data);
        return;
      }
      ret.value.then((data) => {
        next(data);
      })
    }

    next();
  })
}

module.exports = {
  coThunk,
  coPromise
}
