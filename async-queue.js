const queue = () => {
  const list = [];
  let index = 0;
  let isStop = false;
  let isParallel = false;

  const next = () => {
    if (index >= list.length - 1 || isStop || isParallel) return;    
    const cur = list[++index];
    cur(next);
  }

  const add = (...fn) => {
    list.push(...fn);
  }

  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  const parallelRun = () => {
    isParallel = true;
    for(const fn of list) {
      fn(next);
    }
  }

  const stop = () => {
    isStop = true;
  }

  const retry = () => {
    isStop = false;
    run();
  }

  const goOn = () => {
    isStop = false;
    next();
  }

  return {
    add,
    run,
    stop,
    retry,
    goOn,
    parallelRun,
  }
}
const async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x);
      next();
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.parallelRun();
// q.run();

// setTimeout(() => {
//   q.stop();
// }, 3000)

// setTimeout(() => {
//   q.retry();
// }, 5000)

// setTimeout(() => {
//   q.goOn();
// }, 5000)
