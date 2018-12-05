import * as React from 'react';
import GameDebugStateList from "./ui/debug/GameDebugStateList";
import {FunctionComponent, useEffect} from "react";
import {Key} from "ts-key-enum";
import gameStore from "../store/GameStore";

const GameDebug: FunctionComponent = () => {
  const { hideDebug } = gameStore

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === Key.Escape) {
        hideDebug()
      }
    }

    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
  return (
    <div className="game-debug game-ui">
      <h1>Debug interface</h1>
      <GameDebugStateList/>
    </div>
  )
}

export default GameDebug


