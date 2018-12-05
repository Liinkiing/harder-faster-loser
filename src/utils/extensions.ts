export class List<T> extends Array<T> {
  constructor(items?: T[]) {
    if (items && items.length > 0) {
      super(...items)
    } else {
      super(0)
    }
  }
  
  public random(): T {
    return this[Math.floor(Math.random() * this.length)]
  }

  public has(searchedValue: T): boolean {
    return this.find(item => item === searchedValue) !== undefined
  }

  public clear(): void {
    this.length = 0
  }

  public first(): T {
    return this[0]
  }

  public last(): T {
    return this[this.length - 1]
  }
}
