import React, {FunctionComponent} from 'react'

interface Props {
  theme?: 'light' | 'dark',
  center?: boolean,
  rounded?: boolean,
  title?: string,
}

const DebugContainer: FunctionComponent<Props> = (props) => {
  const { theme, title, children, center, rounded } = props
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
  theme: "dark",
  center: false,
  rounded: false
}

export default DebugContainer
