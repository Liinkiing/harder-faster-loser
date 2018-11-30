export default class ElevatorGameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "ElevatorGameScene"
    });
  }


  public update(time: number, delta: number): void {
    console.log('ElevatorGameScene')
  }
}
