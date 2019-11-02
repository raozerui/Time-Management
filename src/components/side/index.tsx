import React ,{useState}from 'react'
import style from './side.module.css'
import classnames from 'classnames'
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';


export function SideBar() {

  return (
    <div className={style['side-bar']}>
      <div className={style['side-bar-bg']}></div>
      <div className={style['side-bar-mock']}></div>
      <CssBaseline />
      <Drawer
        className={style['drawer']}
        variant="permanent"
        classes={{
          paper: style['drawer-paper'],
        }}
        anchor="left"
      >
        <div className={style['side-header']}>
          <Avatar alt="Remy Sharp" src="https://image.ijq.tv/201611/21/12-21-42-63-26.jpg" className={style['big-avatar']} />
          <p className={style['user-name']}>祝绪丹</p>
        </div>        
        <Divider />

        <List>
          {/* 后面拓展的时候只需要这一块改成Link即可 */}
          <ListItem button>
            <ListItemText primary={'今日事项记录'} className={classnames(
            style['active-button'],style['normal-button']
            )}/>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}