import React, {FunctionComponent} from 'react'
import {observer} from "mobx-react-lite";
import gameDebugStore from "../../../store/GameDebugStore";

interface Props {
  center?: boolean,
  rounded?: boolean,
  title?: string,
}

const DebugContainer: FunctionComponent<Props> = (props) => {
  const { title, children, center, rounded } = props
  const { theme } = gameDebugStore
  const classNames = ['game-state-list', 'container']
  if (theme === 'dark') {
    classNames.push('is-dark')
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
    <section className={classNames.join(' ')}>
      {title && title !== "" && <h2 className="title">{title}</h2>}
      {children}
    </section>
  )

}

DebugContainer.defaultProps = {
  center: false,
  rounded: false
}

export default observer(
  DebugContainer
)
