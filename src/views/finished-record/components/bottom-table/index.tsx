import React,{useState} from 'react'
import style from './bottomtable.module.css'
import classnames from 'classnames'

import {TableCustom} from '../../../../components/table'
import GridItem from '../../../../components/grid'
import {InputCard} from '../input-card'
import {Pagination} from '../../../../components/pagination'

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

export function BottomTable() {
  const [isAdd,setIsAdd ] = useState<boolean>(false)
  const addTask = ()=>{
    setIsAdd(true)
  }

  return(
    <>
    <GridItem xs={12} sm={12} md={12}>
      <Card className={style['card-table']}>
        <TableCustom
        tableHead={["标签", "内容", "起始时间", "截止时间"]}
        tableData={[
          ["1", "杭州", "杭州西湖", "89", ],
          ["2", "黄山", "黄山风景区", "68", ],
          ["2", "绍兴", "安山古道", "67", ],
          ["4", "杭州", "杭州湘湖", "59"],
          ["5", "交通", "宁波卖柴古道", "49"],
          ["6", "黄山", "云端村落木梨硔", "38"],
        ]}
        />
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
            allMount={39}
            currentMount={20}
            currentPage={2}
            className={style['page-box']}
          />
        </div>
      </Card>
    </GridItem>
    <InputCard CloseEvent={()=>setIsAdd(false)} isOpen={isAdd}/>
    </>
  )
}