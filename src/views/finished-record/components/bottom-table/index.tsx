import React,{useState, useContext, useEffect} from 'react'
import style from './bottomtable.module.css'
import classnames from 'classnames'
import {RecordStore} from '../../../../core/context'
import {DataProps} from '../../../../core/contrains'
import {TableCustom} from '../../../../components/table'
import GridItem from '../../../../components/grid'
import {InputCard} from '../input-card'
import {Pagination} from '../../../../components/pagination'

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


//选出表格的指定页数,一般来说应该有一个专门处理复杂数据逻辑的model层
let startIndex:number = 0
let endIndex:number = 0

const handleData = (data:DataProps[], amount: number, page: number ):string[][] => {
  let tableDataList:string[][] = []
  endIndex = page*amount
  startIndex = (page-1)*amount
  if(startIndex > data.length) {
    startIndex = data.length - 1 - amount
  }
  
  data.slice(startIndex, endIndex).map((item, index)=>{
    let tableRowData:string[] = []
    tableRowData.push(item.tag)
    tableRowData.push(item.content)
    tableRowData.push(new Date(item.startTime).toTimeString().slice(0,5))
    tableRowData.push(new Date(item.endTime).toTimeString().slice(0,5))

    tableDataList.push(tableRowData)
  })

  return tableDataList
}

// const handleDataAmout = (data: DataProps[], currentData: string[][],amount: number):string[][]=>{
//   if(currentData.length > amount) {
//     return currentData.slice(0, amount)
//   }else {
//     data.slice(endIndex, endIndex + amount - currentData.length).map((item, index)=>{
//       let tableRowData:string[] = []
//       tableRowData.push(item.tag)
//       tableRowData.push(item.content)
//       tableRowData.push(new Date(item.startTime).toTimeString().slice(0,5))
//       tableRowData.push(new Date(item.endTime).toTimeString().slice(0,5))
  
//       currentData.push(tableRowData)
//     })
//     return currentData
//   }
// }


export function BottomTable() {
  const [amount, setAmount] = useState<number>(10)
  const [currentData, setCurrentData] = useState<string[][]>()
  const [page, setPage] = useState<number>(1)
  const [isAdd,setIsAdd ] = useState<boolean>(false)
  const {state} = useContext(RecordStore)

  useEffect(()=>{
    setCurrentData(handleData(state.dataList, amount, page))
  },[state])

  const addTask = ()=>{
    setIsAdd(true)
  }

  const updateData = (num:number)=>{
    setCurrentData(handleData(state.dataList, amount, num))
    setPage(num)
  }

  const updateMount = (num: number)=>{
    if(num !== amount && currentData) {
      setAmount(num)
      setCurrentData(handleData(state.dataList, num, page))
      if((page-1)*amount > state.dataList.length) {
        setPage((Math.ceil(state.dataList.length / num)))
      }
    }
  }

  return(
    <>
    <GridItem xs={12} sm={12} md={12}>
      <Card className={style['card-table']}>
        {currentData && 
          <TableCustom
          tableHead={["标签", "内容", "起始时间", "结束时间"]}
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