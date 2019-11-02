import React from 'react'
import style from './tag.module.css'
import classname from 'classnames'
import GridItem from '../grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export interface TagCardProps {
  content: {
    tag: string,
    allTime: number,
    color: 'red'|'orange'|'blue'|'green'
  }
}

export function TagCard(props: TagCardProps) {
  const {content} = props
  return (
    <GridItem xs={12} sm={6} md={3}>
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
  </GridItem>
  )
}