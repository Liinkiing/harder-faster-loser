import { GameManager } from './GameManager'
import gameStore from '../../store/GameStore'

const BG_MUSIC = 'bg'
const BG_VOLUME = 0.1
const SFX_VOLUME = 0.05

type ExtraConfig = Partial<SoundConfig & SoundMarker>

export default class AudioManager {
  private sound: Phaser.Sound.BaseSoundManager

  get muted() {
    return this.sound.mute
  }

  constructor(private gm: GameManager) {
    this.sound = gm.game.sound
    this.sound.pauseOnBlur = true
  }

  public toggleSounds = (): void => {
    this.sound.mute = !this.sound.mute
    gameStore.changeSettings({
      volume: !this.sound.mute ? 0 : 1,
    })
  }

  public playSfx = (key: string, extra?: ExtraConfig): void => {
    this.sound.play(key, {
      ...extra,
      volume: (extra && extra.volume) || SFX_VOLUME,
    })
  }

  public playBg = (extra?: ExtraConfig): void => {
    this.sound.play(BG_MUSIC, {
      ...extra,
      volume: (extra && extra.volume) || BG_VOLUME,
      loop: true,
    })
  }
}
