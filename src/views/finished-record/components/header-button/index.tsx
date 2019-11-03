import React, { useState, useContext, useReducer } from 'react'
import style from './headerbutton.module.css'
import classnames from 'classnames'
import {RecordStore} from '../../../../core/context'

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import GridItem from '../../../../components/grid'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Modal from '@material-ui/core/Modal';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});



export function HeaderButton() {
  const {state:{tagList}, dispatch}= useContext(RecordStore)
  const [isAdd, setIsAdd] = useState<boolean>(false)


  const createTag = (tag: string)=>{
    setIsAdd(false)
    for(let i = 0; i < tagList.length ; i++) {
      if(tagList[i].tag === tag) {
        alert('标签重复')
        return
      }
    }

    dispatch({
      type: 'AddTag',
      payload: tag
    })
  }

  return (
    <>
      <Card className={style['card']}>
        <Button
          variant="outlined"
          size="large"
          className={classnames(style['button'])}
          endIcon={<BorderColorIcon />}
          onClick={()=>{setIsAdd(true)}}
        >
          新建标签
        </Button>
      </Card>
    <TagInput 
      isOpen={isAdd} 
      CloseEvent={()=>setIsAdd(false)}
      SaveEvent={(tag:string)=>createTag(tag)}/>
    </>
  )
}


export interface InputProps {
  isOpen: boolean
  CloseEvent: () => void
  SaveEvent: (tag:string)=>void
}

const TagInput = (props: InputProps)=>{
  const { CloseEvent, SaveEvent, isOpen} = props
  const [val, setVal] = useState<string>('')
  
  const handleSave =()=>{
    SaveEvent(val)
    setVal('')
  }
  
  return (
    <Modal open={isOpen}>
      <div className={style['middle-card']}>
        <ThemeProvider theme={theme}>
          <TextField
            className={style['text-input']}
            label="新增标签"
            value={val}
            onChange={(event)=>setVal(event.target.value)}
            variant="outlined"
          />
        </ThemeProvider>

        <div className={style['bottom-buttons']}>
        <Button
          variant="contained"
          size="large"
          className={classnames(style['button'],style['cancel-button'])}
          startIcon={<DeleteIcon />}
          onClick={CloseEvent}
        >
          取消
        </Button>

        <Button
          variant="contained"
          size="large"
          className={classnames(style['button'], style['save-button'])}
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          保存
        </Button>
      </div>
      </div>
    </Modal>
  )
}