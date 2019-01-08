import * as React from 'react'
import {
  FunctionComponent,
  KeyboardEventHandler,
  KeyboardEvent,
  useRef,
} from 'react'
import { useCallback } from 'react'
import { Key } from 'ts-key-enum'
import { ReactNode } from 'react'

interface Props {
  validationFeedbackDelay?: number
  children?: ReactNode | string
  onValidate?: (value: string) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  max?: number
  min?: number
  validationClassname?: string
}

type HTMLInputProps = Partial<
  Pick<
    HTMLInputElement,
    'type' | 'checked' | 'defaultValue' | 'value' | 'className'
  >
>

const ValidatableInput: FunctionComponent<Props & HTMLInputProps> = props => {
  const {
    validationClassname,
    validationFeedbackDelay,
    onValidate,
    onKeyDown,
    ...rest
  } = props
  const input = useRef<HTMLInputElement>(null)

  let last: number
  const handleOnKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Key.Enter) {
      if (input.current && !input.current.classList.contains('is-success')) {
        input.current.classList.add('is-success')
      }
      if (last) {
        clearTimeout(last)
      }
      if (onValidate) {
        onValidate((e.target as HTMLInputElement).value)
      }
      last = setTimeout(() => {
        if (input.current && validationClassname) {
          input.current.classList.remove(validationClassname)
        }
      }, validationFeedbackDelay)
    }
    if (onKeyDown) {
      onKeyDown(e)
    }
  }, [])

  return <input {...rest} onKeyDown={handleOnKeyDown} ref={input} />
}

ValidatableInput.defaultProps = {
  validationFeedbackDelay: 2000,
  validationClassname: 'is-success',
}

export default ValidatableInput
