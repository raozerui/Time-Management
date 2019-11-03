import React,{useState, useContext} from 'react'
import style from './card.module.css'
import classnames from 'classnames'
import {RecordStore} from '../../../../core/context'
import {DataProps} from '../../../../core/contrains'
import {Timepicker} from '../../../../components/time-picker'

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

// 校验函数，也应该做一个model做数据处理工作
const validation = (task: DataProps):[boolean, string]=>{
  if(!task.tag || !task.content) {
    return [false, '请填写完整相关信息']
  }else if(task.startTime >= task.endTime) {
    return [false, '起始时间必须小于结束时间']
  }
  return [true, '']
}

export interface DialogProps {
  isOpen: boolean;
  CloseEvent: () => void;
}

export function InputCard(props: DialogProps) {
  const { CloseEvent, isOpen } = props;
  // 其实可以考虑将这四部分封装成一个hook，算是一个表单类型
  const [tag, setTag] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)

  const {state, dispatch} = useContext(RecordStore)

  const handleSave = ()=> {
    const [isOK, msg] = validation({
      tag,
      content,
      startTime,
      endTime
    })

    if(isOK) {
      CloseEvent()
      dispatch({
        type: 'AddData',
        payload: {
          tag,
          content,
          startTime,
          endTime
        }
      })
    }else {
      alert(msg)
    }
    
  }

  return (
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
      >
      <div className={style['middle-board']}>
      <ThemeProvider theme={theme}>
        <TextField
          className={style['text-input']}
          label="已完成事项"
          variant="outlined"
          value={content}
          onChange={(event)=>setContent(event.target.value)}
        />
      </ThemeProvider>

      <FormControl variant="outlined" className={style['text-input']}>
        <InputLabel >请选择事件类型</InputLabel>
        <Select
          labelId="simple-select-filled-label"
          value={tag}
          onChange={(event)=>setTag(event.target.value as string)}
        >
          {state.tagList.map((item, index)=>
          <MenuItem value={item.tag} key={item.tag}>
            {item.tag}
          </MenuItem>
          )}
        </Select>
      </FormControl>

      <div className={style['time-select']}>
        <Timepicker labalText={'起始时间'} updateTime={(num:number)=>setStartTime(num)}/>
        <Timepicker labalText={'结束时间'} updateTime={(num:number)=>setEndTime(num)}/>
      </div>

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