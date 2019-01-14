import React, { FunctionComponent, ReactNode } from 'react'
import Draggable from 'react-draggable'
import { observer } from 'mobx-react-lite'
import {
  ForceThemeProps,
  HideableProps,
  PositionneableProps,
  TitledProps,
} from '../../../utils/interfaces'
import { useClassTheme } from '../../../utils/hooks'

interface Props {
  children?: ReactNode | string
  disabled?: boolean
  center?: boolean
  rounded?: boolean
}

const DebugContainer: FunctionComponent<
  Props & ForceThemeProps & PositionneableProps & TitledProps & HideableProps
> = props => {
  const {
    title,
    children,
    center,
    rounded,
    forceTheme,
    x,
    width,
    hide,
    y,
    height,
    zIndex,
    draggable,
    disabled,
  } = props
  const isDraggable =
    draggable !== undefined ? draggable : DebugContainer.defaultProps!.draggable
  const classNames = ['game-state-list', 'container']
  const themeClass = useClassTheme(forceTheme)
  if (themeClass) {
    classNames.push(themeClass)
  }

  if (disabled) {
    classNames.push('disabled')
  }

  if (title && title !== '') {
    classNames.push('with-title')
  }
  if (center) {
    classNames.push('is-center')
  }
  if (rounded) {
    classNames.push('is-rounded')
  }

  const section = (
    <section
      className={classNames.join(' ')}
      style={{
        left: x,
        top: y,
        width: width || 'initial',
        height: height || 'initial',
        zIndex,
        position: 'fixed',
        display: hide ? 'none' : 'initial',
      }}
    >
      {title && title !== '' && <h2 className="title">{title}</h2>}
      {children}
    </section>
  )

  if (isDraggable) {
    return <Draggable>{section}</Draggable>
  }

  return section
}

DebugContainer.defaultProps = {
  center: false,
  draggable: true,
  hide: false,
  disabled: false,
  rounded: false,
}

export default observer(DebugContainer)
