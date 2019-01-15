import * as React from 'react'
import { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'

const modalsRoot = document.getElementById('modals') as HTMLDivElement

const ModalsContainer: FunctionComponent = props =>
  ReactDOM.createPortal(props.children, modalsRoot)

export default ModalsContainer
