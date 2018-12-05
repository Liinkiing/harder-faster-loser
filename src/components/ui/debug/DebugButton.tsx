import React, {FunctionComponent, MouseEventHandler, ReactNode} from 'react'
import {observer} from "mobx-react-lite";
import gameDebugStore from "../../../store/GameDebugStore";
import {ForceThemeProps, GameDebugTheme, PositionneableProps} from "../../../utils/interfaces";
import {useClassTheme} from "../../../utils/hooks";
import Draggable from "react-draggable";

type RenderProps = (theme: GameDebugTheme) => ReactNode;

interface Props {
  children?: RenderProps | ReactNode | string,
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const DebugButton: FunctionComponent<Props & ForceThemeProps & PositionneableProps> = (props) => {
  const {onClick, children, className, forceTheme, x, y, zIndex, draggable} = props
  const classNames = ['debug-button', 'game-debug-toggle-button']
  const {theme} = gameDebugStore

  if (className) {
    classNames.push(...className.split(' '))
  }

  const themeClass = useClassTheme(forceTheme)
  if (themeClass) {
    classNames.push(themeClass)
  }

  const render = children ?
    typeof children === 'function' ?
      (children as RenderProps)(theme) :
      children :
    null

  const button = <button
    {...(onClick ? {onClick} : {})}
    style={{left: x, top: y, zIndex, ...(x || y ? {position: 'absolute'} : {})}}
    className={classNames.join(' ')}>
    {render}
  </button>

  if (draggable !== undefined && draggable) {
    return (
      <Draggable>
        {button}
      </Draggable>
    )
  }

  return button
}

DebugButton.defaultProps = {
  draggable: false
}

export default observer(
  DebugButton
)
