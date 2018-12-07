import React, { FunctionComponent, ReactNode } from 'react'
import Draggable from 'react-draggable'
import { observer } from 'mobx-react-lite'
import { ForceThemeProps, PositionneableProps } from '../../../utils/interfaces'
import { useClassTheme } from '../../../utils/hooks'

interface Props {
  children?: ReactNode | string
  center?: boolean
  rounded?: boolean
  title?: string
}

const DebugContainer: FunctionComponent<
  Props & ForceThemeProps & PositionneableProps
> = props => {
  const {
    title,
    children,
    center,
    rounded,
    forceTheme,
    x,
    y,
    zIndex,
    draggable,
  } = props
  const isDraggable =
    draggable !== undefined ? draggable : DebugContainer.defaultProps!.draggable
  const classNames = ['game-state-list', 'container']
  const themeClass = useClassTheme(forceTheme)
  if (themeClass) {
    classNames.push(themeClass)
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
      style={{ left: x, top: y, zIndex , position: 'fixed'}}
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
  rounded: false,
}

export default observer(DebugContainer)
