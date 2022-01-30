import { ComponentType } from 'react'

export type R3FComponentProps<T = unknown> = T & {
  r3f: boolean
}

export type R3FComponent<T = unknown> = ComponentType<R3FComponentProps<T>>
