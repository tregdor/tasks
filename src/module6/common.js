
const common = {
  randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },
  memoize(func) {
    const map = new Map();
    const weakMap = new WeakMap();

    return (...arg) => {
      if (arg.length > 1) {
        const hashName = JSON.stringify(arg);
        if (map.has(hashName)) {
          return map.get(hashName);
        }
        const res = func(...arg);
        map.set(hashName, res);
        return res;
      }
      if (typeof arg[0] === "object" || typeof arg[0] === "function") {
        if (weakMap.has(arg[0])) {
          return weakMap.get(arg[0]);
        }
        const res = func(arg[0]);
        weakMap.set(arg[0], res);
        return res;
      }
      if (map.has(arg[0])) {
        return map.get(arg[0]);
      }
      const res = func(arg[0]);
      map.set(arg[0], res);
      return res;
    };
  },
};
module.exports = {
  common,
};
