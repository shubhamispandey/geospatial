declare module 'react-window' {
  import { ComponentType } from 'react'
  interface ListChildComponentProps<T = unknown> {
    index: number
    style: React.CSSProperties
    data: T
  }
  interface FixedSizeListProps<T = unknown> {
    height: number
    itemCount: number
    itemSize: number
    width: number | string
    itemData?: T
    children: ComponentType<ListChildComponentProps<T>>
  }
  export const FixedSizeList: <T = unknown>(props: FixedSizeListProps<T>) => JSX.Element
}
