import 'phaser'
import * as React from 'react';
import {gameConfig} from "../utils/game";

class Game extends React.Component {

  public game?: Phaser.Game;

  public componentDidMount(): void {
    this.game = new Phaser.Game(gameConfig)
  }

  public render() {
    return (

      <div id="game" className="Game">
        <h1>Issou</h1>
      </div>
    );
  }
}

export default Game;
