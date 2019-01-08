import { ContainerConstructor } from '../../../utils/interfaces'
import KeyboardButton, { Code } from './KeyboardButton'
import { List } from '../../../utils/extensions'
import gameStore from '../../../store/GameStore'

const COLUMNS = 3
const ROWS = 2

export default class KeyboardContainer extends Phaser.GameObjects.Container {
  private readonly buttons: List<KeyboardButton> = new List([])

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y, params.children)

    Array.from(['◻', '▲', '|||', '☰', 'O', 'U']).forEach((code, index) => {
      this.buttons.push(
        new KeyboardButton({
          scene: params.scene,
          code: code as Code,
          x: ((index % COLUMNS) * 280 + 280) / gameStore.ratioResolution,
          y: ((index % ROWS) * 260 + 260) / gameStore.ratioResolution,
        })
      )
    })

    this.add(this.buttons)

    params.scene.add.existing(this)
  }
}
