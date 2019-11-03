import React,{useContext} from 'react'
import style from './tag.module.css'
import classname from 'classnames'
import {RecordStore} from '../../../../core/context'
import {TagProps} from '../../../../core/contrains'


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

export interface TagCardProps {
  content: TagProps
}

export function TagCard(props: TagCardProps) {
  const {content} = props
  const {dispatch} = useContext(RecordStore)

  const deleteTag=()=>{
    if(content.allTime > 0) {
      alert('删除标签会将对应的记录一到删除')
    }
    dispatch({
      type: 'DeleteTag',
      payload: content.tag
    })
  }

  return (
    <Card className={classname(
      style['card'],
      style['card-' + content.color + '-color']
      )}>
      <CardContent className={style['card-header']}>
        <Typography variant="h5" component="h2" style={{color: '#dff7f1'}}>
          {content.tag}
        </Typography>
      </CardContent>
      <HighlightOffOutlinedIcon className={style['card-delete']} onClick={deleteTag}/>
      <CardContent className={style['card-info']} style={{color: '#dff7f1'}}>
        <Typography variant="body2" component="p" className={style['time']}>
          今日总时长
        </Typography>
        <Typography variant="h5" component="h2" className={style['time']}>
          {content.allTime}mins
        </Typography>
      </CardContent>
    </Card>
  )
}