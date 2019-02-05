import { randomRange } from '../../utils/functions'
import data from '../../assets/data.json'
import { DataItem } from '../../utils/interfaces'

export class DataManager {
  constructor() {
    console.log('DataManager init')
  }

  public pickRandomData = (): DataItem => {
    return data[Math.floor(randomRange(0, data.length))]
  }
}

const dataManager = new DataManager()
export default dataManager
