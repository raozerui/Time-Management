// 一个XOR泛型，在这里用于解决：某个对象中某些属性要不都有，要不就一个都别有
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
export type XOR<T, U> = (T | U) extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U

export type Color = 'green'|'red'| 'orange'| 'blue'
export interface TagProps {
  tag: string
  allTime: number
  color: Color
}

export interface DataProps {
  startTime: number
  endTime: number
  content: string
  tag: string
}


// reducer函数的类型限制
export type ReducerAction = |{
  type: 'AddTag'|'DeleteTag';
  payload: string
}|{
  type: 'AddData';
  payload: DataProps
}