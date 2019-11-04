import React,{useState, useEffect} from 'react'
import style from './pagination.module.css'
import classnames from 'classnames'

import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {
  ThemeProvider,
  createMuiTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});


export interface PaginationProps {
  allAmount: number,
  currentAmount: number,
  currentPage: number,
  className: string,
  changePage: (num:number)=>any,
  changeMount: (num:number)=>any
}
export function Pagination(props: PaginationProps) {
  const {allAmount, currentAmount, currentPage, className, changeMount, changePage} = props
  const [pages, setPages] = useState<number>(1)

  console.log(allAmount)

  useEffect(()=>{
    setPages(Math.ceil(allAmount / currentAmount))
  },[allAmount, currentAmount])

  const jumpToFirst = ()=>{
    changePage(1)
  }

  const jumpToEnd = ()=>{
    changePage(pages)
  }

  const jumpToPrev = ()=>{
    changePage(currentPage - 1)
  }

  const jumpToNext = ()=>{
    changePage(currentPage + 1)
  }

  const jumpToPage =(num:number)=>{
    if(num > pages) {
      jumpToEnd()
    }else if(num < 1) {
      jumpToFirst()
    }else {
      changePage(num)
    }
      
  }

  return (
    <div className={className}>
    <FormControl variant="outlined" className={style['select-mount']}>
      <Select
        labelId="simple-select-filled-label"
        id="simple-select-filled"
        value={currentAmount}
        onChange={(event)=>changeMount(Number(event.target.value))}
      >
        {/* 全局数据在这里渲染一个列表 */}
        {['5','10','20'].map((item, index)=>
        <MenuItem value={item} key={item}>
          {item}
        </MenuItem>
        )}
      </Select>
    </FormControl>

    <Button 
      variant="text" 
      size="small"
      disabled={currentPage === 1}
      onClick={jumpToFirst}
    >
      <LastPageIcon className={style['rotate-icon']}/>
    </Button>
    <Button 
      variant="text" 
      size="small"
      disabled={currentPage === 1}
      onClick={jumpToPrev}
    >
      <ChevronLeftIcon />
    </Button>

    <ThemeProvider theme={theme}>
      <TextField
        className={style['text-input']}
        label={'当前页'}
        value={currentPage}
        onChange={(event)=>jumpToPage(Number(event.target.value))}
      />
    </ThemeProvider>
    <Typography variant="subtitle1" gutterBottom>
      &nbsp;/&nbsp;{pages}
    </Typography>

    <Button 
      variant="text" 
      size="small"
      disabled={currentPage === pages}
      onClick={jumpToNext}
    >
      <ChevronRightIcon />
    </Button>
    <Button 
      variant="text" 
      size="small"
      disabled={currentPage === pages}
      onClick={jumpToEnd}
    >
      <LastPageIcon />
    </Button>
    </div>
  )
}