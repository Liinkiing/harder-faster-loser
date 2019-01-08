import { SpriteConstructor } from '../../../utils/interfaces'
import gameStore from '../../../store/GameStore'
import { Emitter } from '../../manager/GameManager'
import { GameEvents } from '../../../utils/enums'
import { Omit } from '../../../utils/types'

export type Code = '◻' | '▲' | '|||' | '☰' | 'O' | 'U'

export default class KeyboardPasswordButton extends Phaser.GameObjects.Sprite {
  public code: Code

  constructor(
    params: Omit<SpriteConstructor, 'texture'> & {
      code: Code
      style?: 'keyboard' | 'symbol'
    }
  ) {
    params.style = params.style || 'keyboard'
    let texture = `mdp_${params.style}_1`
    switch (params.code) {
      case '◻':
        texture = `mdp_${params.style}_1`
        break
      case '▲':
        texture = `mdp_${params.style}_2`
        break
      case '|||':
        texture = `mdp_${params.style}_3`
        break
      case '☰':
        texture = `mdp_${params.style}_4`
        break
      case 'O':
        texture = `mdp_${params.style}_5`
        break
      case 'U':
        texture = `mdp_${params.style}_6`
        break
    }
    super(params.scene, params.x, params.y, texture, params.frame)
    this.code = params.code

    this.setOrigin(0, 0).setScale(
      1 / gameStore.ratioResolution,
      1 / gameStore.ratioResolution
    )

    if (params.style === 'keyboard') {
      this.setInteractive()
      this.on('pointerover', () => {
        this.setTexture(`${texture}_hover`)
      })
      this.on('pointerout', () => {
        this.setTexture(`${texture}`)
      })
      this.on('pointerdown', () => {
        Emitter.emit(GameEvents.KeyboardPasswordButtonClicked, this.code)
      })
    }

    params.scene.add.existing(this)
  }
}
