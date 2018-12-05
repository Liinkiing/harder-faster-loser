import React, {FunctionComponent, ReactNode} from 'react'
import Draggable from 'react-draggable';
import {observer} from "mobx-react-lite";
import {ForceThemeProps} from "../../../utils/interfaces";
import {useClassTheme} from "../../../utils/hooks";

interface Props {
  x?: number,
  y?: number,
  zIndex?: number,
  children?: ReactNode | string,
  center?: boolean,
  rounded?: boolean,
  title?: string,
}

const DebugContainer: FunctionComponent<Props & ForceThemeProps> = (props) => {
  const { title, children, center, rounded, forceTheme, x, y, zIndex } = props
  const classNames = ['game-state-list', 'container']
  const themeClass = useClassTheme(forceTheme)
  if (themeClass) {
    classNames.push(themeClass)
  }

  if (title && title !== "") {
    classNames.push('with-title')
  }
  if (center) {
    classNames.push('is-center')
  }
  if (rounded) {
    classNames.push('is-rounded')
  }

  return (
    <Draggable>
      <section className={classNames.join(' ')} style={{left: x, top: y, zIndex }}>
        {title && title !== "" && <h2 className="title">{title}</h2>}
        {children}
      </section>
    </Draggable>
  )

}

DebugContainer.defaultProps = {
  center: false,
  rounded: false
}

export default observer(
  DebugContainer
)
