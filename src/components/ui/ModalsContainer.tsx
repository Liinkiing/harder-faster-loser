import * as React from 'react'
import { FunctionComponent, useEffect } from 'react'
import ReactDOM from 'react-dom'

const modalsRoot = document.getElementById('modals') as HTMLDivElement

const ModalsContainer: FunctionComponent = props => {
  useEffect(() => {
    modalsRoot.classList.add('visible')
    return () => {
      modalsRoot.classList.remove('visible')
    }
  }, [])
  return ReactDOM.createPortal(props.children, modalsRoot)
}

export default ModalsContainer
