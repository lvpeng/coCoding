function iteratorFactory(items) {
  let iterator = {
    index: 0,
    done: false,
  };

  iterator.next = function () {
    return this.index === items.length
      ? { value: undefined, done: true }
      : { value: items[this.index++], done: false };
  };

  return iterator;
}


let iterator = iteratorFactory([1, 2, 3]);

do {
  var ret = iterator.next();
  console.log(ret);
} while (!ret.done);
