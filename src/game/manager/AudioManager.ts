import { GameManager } from './GameManager'
import gameStore from '../../store/GameStore'

const BG_MUSIC = 'bg'
const BG_VOLUME = 0.1
const AMBIANT_VOLUME = 0.1
const SFX_VOLUME = 0.05

type ExtraConfig = Partial<SoundConfig & SoundMarker>

export default class AudioManager {
  private previousDetune: number
  private sound: Phaser.Sound.BaseSoundManager
  private bg?: Phaser.Sound.BaseSound
  private ambiant?: Phaser.Sound.BaseSound
  private uniqueSfx?: Phaser.Sound.BaseSound

  get muted() {
    return this.sound.mute
  }

  constructor(private gm: GameManager) {
    this.sound = gm.game.sound
    this.previousDetune = this.sound.detune
    this.sound.pauseOnBlur = true
  }

  set detuneBg(value: number) {
    if (this.bg) {
      this.previousDetune = (this.bg as Phaser.Sound.WebAudioSound).detune
      this.bg.play('', {
        detune: value,
        seek: (this.bg as Phaser.Sound.WebAudioSound).seek,
      })
    }
  }

  get ambientPlaying() {
    return this.ambiant && this.ambiant.isPlaying
  }

  public untuneBg = (): void => {
    if (this.bg) {
      this.bg.play('', {
        detune: this.previousDetune,
        seek: (this.bg as Phaser.Sound.WebAudioSound).seek,
      })
    }
  }

  public toggleSounds = (): void => {
    this.sound.mute = !this.sound.mute
    gameStore.changeSettings({
      volume: !this.sound.mute ? 0 : 1,
    })
  }

  public playSfx = (key: string, extra?: ExtraConfig) => {
    this.sound.play(key, {
      ...extra,
      volume: (extra && extra.volume) || SFX_VOLUME,
    })
  }

  public playUniqueSfx = (key: string, extra?: ExtraConfig) => {
    if (this.uniqueSfx) {
      this.uniqueSfx.stop()
    }
    this.uniqueSfx = this.sound.add(key, {
      ...extra,
      volume: (extra && extra.volume) || SFX_VOLUME,
    })
    this.uniqueSfx.play()
  }

  public playBg = (extra?: ExtraConfig): void => {
    this.bg = this.sound.add(BG_MUSIC, {
      ...extra,
      volume: (extra && extra.volume) || BG_VOLUME,
      loop: true,
    })
    this.bg.play()
  }

  public stopAmbientMusic = (): void => {
    if (this.ambiant) {
      this.ambiant.stop()
    }
    if (this.bg) {
      this.bg.resume()
    }
  }

  public playAmbientMusic = (
    key: string,
    extra: ExtraConfig & { playOverBg?: boolean } = { playOverBg: false }
  ): void => {
    if (this.bg && !extra.playOverBg) {
      this.bg.pause()
    }
    this.ambiant = this.sound.add(key, {
      ...extra,
      seek: 0,
      volume: (extra && extra.volume) || AMBIANT_VOLUME,
      loop: false,
    })
    this.ambiant.play()
  }
}
