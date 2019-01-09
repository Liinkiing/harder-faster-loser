import { ContainerConstructor } from '../../../utils/interfaces'
import KeyboardPasswordButton, { Code } from './KeyboardPasswordButton'
import { List } from '../../../utils/extensions'
import gameStore from '../../../store/GameStore'
import { shuffle } from '../../../utils/functions'

const COLUMNS = 3
const ROWS = 2

export default class KeyboardContainer extends Phaser.GameObjects.Container {
  private readonly buttons: List<KeyboardPasswordButton> = new List([])

  constructor(params: ContainerConstructor) {
    super(params.scene, params.x, params.y, params.children)

    Array.from(shuffle(['◻', '▲', '|||', '☰', 'O', 'U'])).forEach(
      (code, index) => {
        this.buttons.push(
          new KeyboardPasswordButton({
            scene: params.scene,
            code: code as Code,
            x: ((index % COLUMNS) * 280) / gameStore.ratioResolution,
            y: ((index % ROWS) * 260) / gameStore.ratioResolution,
          })
        )
      }
    )

    this.add(this.buttons)
    params.scene.add.existing(this)
  }

  public getButton = (code: Code): KeyboardPasswordButton | undefined =>
    this.buttons.find(button => button.code === code)
}
