const { describe } = require("mocha");
const { assert } = require("chai");
const sinon = require("sinon");
const { memoize } = require("./index");

describe("test memoize", () => {
  const cb = sinon.fake();
  beforeEach(() => {
    cb.callCount = 0;
  });
  describe("none ref type", () => {
    it("a function  should called once", () => {
      const memoizeFunc = memoize(cb);
      memoizeFunc(2);
      memoizeFunc(2);
      assert.equal(cb.callCount, 1);
    });

    it("a function should called twice", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc(2);
      memoizeFunc(3);

      assert.equal(cb.callCount, 2);
    });

    it("a function should called once", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc(2, 2);
      memoizeFunc(2, 2);

      assert.equal(cb.callCount, 1);
    });

    it("a function should called twice", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc(2, 2);
      memoizeFunc(2, 3);

      assert.equal(cb.callCount, 2);
    });

    it("a function  should called once", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc(1, 2, 3, 4);
      memoizeFunc(1, 2, 3, 4);

      assert.equal(cb.callCount, 1);
    });

    it("a function should called twice", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc(7, 2, 3, 4);
      memoizeFunc(1, 3, 3, 4);

      assert.equal(cb.callCount, 2);
    });
  });

  describe("ref type", () => {
    it("a function  should called twice", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc({ state: 1 });
      memoizeFunc({ state: 1 });

      assert.equal(cb.callCount, 2);
    });

    it("a function should called twice", () => {
      const memoizeFunc = memoize(cb);

      memoizeFunc({ state: 1 });
      memoizeFunc({ state: 2 });

      assert.equal(cb.callCount, 2);
    });

    it("a function  should called once", () => {
      const memoizeFunc = memoize(cb);

      function test() {}

      memoizeFunc(test);
      memoizeFunc(test);

      assert.equal(cb.callCount, 1);
    });

    it("a function should called twice", () => {
      const memoizeFunc = memoize(cb);

      function test1() {}

      function test2() {}

      memoizeFunc(test1);
      memoizeFunc(test2);

      assert.equal(cb.callCount, 2);
    });

    it("a function should called once", () => {
      const memoizeFunc = memoize(cb);
      const obj = {
        text: "asd",
        obj1: {
          text2: "gsd",
        },
      };
      memoizeFunc(obj);
      memoizeFunc(obj);

      assert.equal(cb.callCount, 1);
    });
  });
});
