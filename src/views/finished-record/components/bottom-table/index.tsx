import React,{useState, useContext, useEffect} from 'react'
import style from './bottomtable.module.css'
import classnames from 'classnames'
import {RecordStore} from '../../../../core/context'
import TableModel from '../../../../core/table.module'
import {DataProps, TagProps} from '../../../../core/contrains'
import {TableCustom} from '../../../../components/table'
import GridItem from '../../../../components/grid'
import {InputCard} from '../input-card'
import {Pagination} from '../../../../components/pagination'
import {TableHeadProps} from '../../../../components/table'

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';




// 补充一下数据管理即可
export function BottomTable() {
  const [amount, setAmount] = useState<number>(10)
  const [tableHeadData, setTableHeadData] = useState<TableHeadProps[]>()
  const [currentData, setCurrentData] = useState<string[][]>()
  const [page, setPage] = useState<number>(1)
  const [isAdd,setIsAdd ] = useState<boolean>(false)
  const {state} = useContext(RecordStore)

  useEffect(()=>{
    TableModel.initTableData(state.dataList)
    setCurrentData(TableModel.handleData(amount, page))
  },[state.dataList.length])

  useEffect(()=>{
    setTableHeadData(TableModel.handleHeadData(state.tagList))
  },[state.tagList.length])

  const addTask = ()=>{
    setIsAdd(true)
  }

  const updateData = (num:number)=>{
    setCurrentData(TableModel.handleData(amount, num))
    setPage(num)
  }

  const updateMount = (num: number)=>{
    if(num !== amount && currentData) {
      setAmount(num)
      setCurrentData(TableModel.handleData(num, page))

      if((page-1)*amount > state.dataList.length) {
        setPage(Math.ceil(state.dataList.length / num))
      }
    }
  }

  const headSelect = (headName: string, tagName:string)=>{
    if(tagName === '标签') {
      TableModel.initTableData(state.dataList)
      setCurrentData(TableModel.handleData(amount, page))
      return
    }
    setCurrentData(TableModel.selectData(state.dataList, amount, tagName))
  }

  return(
    <>
    <GridItem xs={12} sm={12} md={12}>
      <Card className={style['card-table']}>
        {currentData && 
          <TableCustom
          tableHead={tableHeadData||[]}
          updateHead={(headName:string, tagName: string)=>headSelect(headName, tagName)}
          tableData={currentData}
          />
        }
        <div className={style['card-bottom']}>
          <Button
            variant="contained"
            size="large"
            className={classnames(style['add-button'])}
            endIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={addTask}
          >
            添加事项
          </Button>

          <Pagination 
            allAmount={state.dataList.length}
            currentAmount={amount}
            currentPage={page}
            className={style['page-box']}
            changeMount={updateMount}
            changePage={updateData}
          />
        </div>
      </Card>
    </GridItem>
    <InputCard CloseEvent={()=>setIsAdd(false)} isOpen={isAdd}/>
    </>
  )
}