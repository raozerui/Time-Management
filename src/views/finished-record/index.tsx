import React,{useReducer} from 'react'
import style from './finished.module.css'
import {RecordStore,initState,RecordReducer} from '../../core/context'
import {TagCard} from './components/tag-card'
import Divider from '@material-ui/core/Divider';
import {BottomTable} from './components/bottom-table'
import {HeaderButton} from './components/header-button'


export default function FinishedRecord() {
  const [state, dispatch] = useReducer(RecordReducer, initState)

  return (
    <div className={style['page']}>
      <RecordStore.Provider value={{state, dispatch}}>
        <div className={style['body']}>
          <header className={style['header']}>
            {state.tagList.map((item, index)=>
            <TagCard key={item.tag} content={item}  />
            )}
            <HeaderButton />
          </header>
          <Divider />
          <BottomTable />
        </div> 
      </RecordStore.Provider>
    </div>
  )
}