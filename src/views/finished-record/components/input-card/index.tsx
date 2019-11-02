import React,{useState} from 'react'
import style from './card.module.css'
import classnames from 'classnames'
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

export interface DialogProps {
  isOpen: boolean;
  CloseEvent: () => void;
}

export function InputCard(props: DialogProps) {
  const { CloseEvent, isOpen } = props;
  const [tag, setTag] = useState<string>('')

  const handleSave = ()=> {
    CloseEvent()
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
          id="mui-theme-provider-outlined-input"
        />
      </ThemeProvider>

      <FormControl variant="outlined" className={style['text-input']}>
        <InputLabel id="simple-select-filled-label">请选择事件类型</InputLabel>
        <Select
          labelId="simple-select-filled-label"
          id="simple-select-filled"
          value={tag}
          onChange={(event)=>setTag(event.target.value as string)}
        >
          {/* 全局数据在这里渲染一个列表 */}
          {['学习','工作','购物'].map((item, index)=>
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
          )}
        </Select>
      </FormControl>

      <div className={style['time-select']}>
        <Timepicker labalText={'起始时间'}/>
        <Timepicker labalText={'截止时间'}/>
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