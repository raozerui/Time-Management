import React from 'react'
import style from './finished.module.css'
import {TagCard} from '../../components/tag-card'
import Divider from '@material-ui/core/Divider';
import {BottomTable} from './components/bottom-table'
import {HeaderButton} from './components/header-button'

const card:{
  tag: string,
  allTime: number,
  color: 'red'|'orange'|'blue'|'green'
}[] = [
  {
    tag:'学习',
    allTime: 36,
    color: 'green',
  },
  {
    tag:'娱乐',
    allTime: 36,
    color: 'red',
  },
  {
    tag:'购物',
    allTime: 36,
    color: 'orange',
  }
]

export default function FinishedRecord() {

  return (
    <div className={style['page']}>
      <body className={style['body']}>
        <header className={style['header']}>
          {card.map((item, index)=>
          <TagCard key={item.allTime} content={item}  />
          )}
          <HeaderButton />
        </header>
        <Divider />
        <BottomTable />
      </body> 
    </div>
  )
}