import { SpriteConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { Emitter } from '../../manager/GameManager'
import { GameEvents } from '../../../utils/enums'
import { Omit } from '../../../utils/types'

export type Code = '◻' | '▲' | '|||' | '☰' | 'O' | 'U'

export default class KeyboardPasswordButton extends Phaser.GameObjects.Sprite {
  constructor(params: Omit<SpriteConstructor, 'texture'> & { code: Code }) {
    let texture = 'mdp_keyboard_1'
    switch (params.code) {
      case '◻':
        texture = 'mdp_keyboard_1'
        break
      case '▲':
        texture = 'mdp_keyboard_2'
        break
      case '|||':
        texture = 'mdp_keyboard_3'
        break
      case '☰':
        texture = 'mdp_keyboard_4'
        break
      case 'O':
        texture = 'mdp_keyboard_5'
        break
      case 'U':
        texture = 'mdp_keyboard_6'
        break
    }
    super(params.scene, params.x, params.y, texture, params.frame)

    this.setOrigin(0, 0).setScale(
      1 / gameStore.ratioResolution,
      1 / gameStore.ratioResolution
    )

    this.setInteractive()
    this.on('pointerover', () => {
      this.setTexture(`${texture}_hover`)
    })
    this.on('pointerout', () => {
      this.setTexture(`${texture}`)
    })
    this.on('pointerdown', () => {
      Emitter.emit(GameEvents.KeyboardPasswordButtonClicked, params.code)
    })

    params.scene.add.existing(this)
  }
}
