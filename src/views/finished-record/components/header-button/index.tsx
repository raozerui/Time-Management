import React, { useState } from 'react'
import style from './headerbutton.module.css'
import classnames from 'classnames'
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
  const [isAdd, setIsAdd] = useState<boolean>(false)

  const createTag = ()=>{
    setIsAdd(true)
  }

  return (
    <>
    <GridItem xs={12} sm={6} md={3} style={{height:'100%'}}>
      <Card style={{height:'100%'}}>
        <Button
          variant="outlined"
          size="large"
          className={classnames(style['button'])}
          endIcon={<BorderColorIcon />}
          onClick={createTag}
        >
          新建标签
        </Button>
      </Card>
    </GridItem>
    <Input isOpen={isAdd} CloseEvent={()=>setIsAdd(false)}/>
    </>
  )
}


export interface InputProps {
  isOpen: boolean;
  CloseEvent: () => void;
}
const Input = (props: InputProps)=>{
  const { CloseEvent, isOpen } = props
  
  const handleSave =()=>{}
  
  return (
    <Modal open={isOpen}>
      <div className={style['middle-card']}>
        <ThemeProvider theme={theme}>
          <TextField
            className={style['text-input']}
            label="新增标签"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
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