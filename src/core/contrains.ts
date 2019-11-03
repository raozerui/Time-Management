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
  type: 'AddTag';
  payload: string
}|{
  type: 'AddData';
  payload: DataProps
}