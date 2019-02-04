import data from '../../assets/data.json'
import { randomRange } from '../../utils/functions'

export class DataManager {
  constructor() {
    console.log('DataManager init')
  }

  public pickRandomData = (): Object => {
    const dataItem = data.data[Math.floor(randomRange(0, data.data.length))]
    return dataItem
  }
}

const dataManager = new DataManager()
export default dataManager
