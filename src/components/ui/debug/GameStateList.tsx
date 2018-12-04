import * as React from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../../../store/GameStore";
import {GameState} from "../../../utils/enums";
import {ChangeEvent} from "react";

const GameStateList = () => {
  const {state, changeState} = gameStore
  const availableStates = Object.keys(GameState).map(gameState => GameState[gameState])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => changeState(e.target.value as GameState)

  return (
    <div className="game-state-list">
      {availableStates.map(availableState => {
        return (
          <span key={availableState} className="game-state-list--item">
          <input
            id={availableState}
            type="radio"
            name="currentState"
            value={availableState}
            checked={availableState === state}
            onChange={handleInputChange}
          />
          <label htmlFor={availableState}>{availableState}</label>
        </span>
        )
      })}
    </div>
  )
}

export default observer(
  GameStateList
)


