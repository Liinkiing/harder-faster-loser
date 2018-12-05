import * as React from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../../../store/GameStore";
import {GameState} from "../../../utils/enums";
import {ChangeEvent, FunctionComponent} from "react";
import DebugContainer from "./DebugContainer";

const GameDebugStateList: FunctionComponent = () => {
  const {state, changeState} = gameStore
  const availableStates = Object.keys(GameState).map(gameState => GameState[gameState])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => changeState(e.target.value as GameState)

  return (
    <DebugContainer title="Game state">
      {availableStates.map(availableState => {
        return (
          <label key={availableState} className="game-state-list--item">
            <input id={availableState}
                   className="radio"
                   type="radio"
                   name="currentState"
                   value={availableState}
                   checked={availableState === state}
                   onChange={handleInputChange}/>
            <span>{availableState}</span>
          </label>
        )
      })}
    </DebugContainer>
  )
}

export default observer(
  GameDebugStateList
)


