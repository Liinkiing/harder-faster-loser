interface Array<T> {
  random(): T,
  has(item: T): boolean,
  clear(): void,
  first(): T,
  last(): T,
  shuffle(): T[]
}

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
};

Array.prototype.has = function (searchedValue) {
  return this.find(item => item === searchedValue) !== undefined
};

Array.prototype.clear = function () {
  this.length = 0
};

Array.prototype.first = function () {
  return this[0]
};

Array.prototype.last = function () {
  return this[this.length - 1]
};

Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }

  return this
}
