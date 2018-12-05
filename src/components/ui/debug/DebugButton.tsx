import React, {FunctionComponent, MouseEventHandler, ReactNode} from 'react'
import {observer} from "mobx-react-lite";
import gameDebugStore from "../../../store/GameDebugStore";
import {ForceThemeProps, GameDebugTheme} from "../../../utils/interfaces";
import {useClassTheme} from "../../../utils/hooks";

type RenderProps = (theme: GameDebugTheme) => ReactNode;

interface Props {
  children?: RenderProps | ReactNode | string,
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const DebugButton: FunctionComponent<Props & ForceThemeProps> = (props) => {
  const {onClick, children, className, forceTheme } = props
  const classNames = ['debug-button', 'game-debug-toggle-button']
  const { theme } = gameDebugStore

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

  return (
    <button
      {...(onClick ? {onClick} : {})}
      className={classNames.join(' ')}>
      {render}
    </button>
  )
}

export default observer(
  DebugButton
)
