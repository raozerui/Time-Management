import React from 'react'
import style from './tag.module.css'
import classname from 'classnames'
import {TagProps} from '../../../../core/contrains'

import GridItem from '../../../../components/grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export interface TagCardProps {
  content: TagProps
}

export function TagCard(props: TagCardProps) {
  const {content} = props
  return (
    <Card className={classname(
      style['card'],
      style['card-' + content.color + '-color']
      )}>
      <CardContent className={style['card-header']}>
        <Typography variant="h5" component="h2">
          {content.tag}
        </Typography>
      </CardContent>

      <CardContent className={style['card-info']}>
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