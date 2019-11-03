import {createContext} from 'react'
import {ReducerAction,TagProps,DataProps} from './contrains'


export interface RecordState {
  tagList: TagProps[],
  dataList: DataProps[]
}

export const initState:RecordState = {
  tagList: [
    {
      tag:'学习',
      allTime: 36,
      color: 'green'
    },
    {
      tag:'娱乐',
      allTime: 25,
      color: 'red',
    },
    {
      tag:'购物',
      allTime: 50,
      color: 'orange',
    }
],
  dataList: [
    {
      startTime: 1572748100221,
      endTime: 1572749600221,
      tag: '娱乐',
      content: 'LOL'
    },{
      startTime: 1572749710221,
      endTime: 1572752710221,
      tag: '购物',
      content: '出去买菜'
    },{
      startTime: 1572758108221,
      endTime: 1572760269221,
      tag: '学习',
      content: '阅读时间简史'
    }
  ]
}
const color = ['green', 'red', 'orange', 'blue']

// 项目太小就不单独处理reducer了
export function AddTag (state:RecordState ,payload:string) {
  let len = state.tagList.length
  state.tagList.push(
    {
      tag: payload,
      allTime: 0,
      color: color[len % 4] as TagProps['color']
    }
  )
  return {...state}
}

export function DeleteTag (state:RecordState ,payload:string) {
  for (let i =0; i < state.tagList.length; i++) {
    if(state.tagList[i].tag === payload){
      state.tagList.splice(i,1)
      break
    }
  }

  for (let i =0; i < state.dataList.length; i++) {
    if(state.dataList[i].tag === payload) {
      state.dataList.splice(i, 1)
    }
  }

  return {...state}
}

export function AddData (state:RecordState ,payload:DataProps) {
  for (let i =0; i < state.dataList.length; i++) {
    if(state.dataList[i].startTime > payload.startTime) {
      state.dataList.splice(i, 0, payload)
      break
    }else if(i === state.dataList.length-1) {
      state.dataList.push(payload)
      break
    }
  }

  state.tagList.map((item,index)=>{
    if(item.tag === payload.tag) {
      state.tagList[index].allTime += (Math.round((payload.endTime - payload.startTime)/(1000*60)))
    }
  })
  return {...state}
}

export function RecordReducer(state:RecordState, action:ReducerAction) {
  const ActionType: {
    [i:string]: (j:RecordState,k:any) => RecordState
  } ={
    AddTag,
    AddData,
    DeleteTag
  }
  return ActionType[action.type](state,action.payload)
}

export let RecordStore = createContext<{state:RecordState,dispatch:React.Dispatch<ReducerAction>}>({
  state: initState,
  dispatch: ((value: ReducerAction) => void(0))
})