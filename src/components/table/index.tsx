import React from 'react'
import style from './table.module.css'
import {XOR } from '../../core/contrains'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color: '#4caf50',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
      color: '#4caf50',
    },
  }),
);


export type TableHeadProps = { name: string } & XOR<{}, { isSelect: boolean, selectList: string[] }>
export interface TableProps {
  tableHead: TableHeadProps[]
  tableData: string[][],
  updateHead: (headName: string, tagName:string)=>any
}

export function TableCustom(props:TableProps){
  const {tableHead, tableData,updateHead } = props
  const classes = useStyles()


  return (
    <div className={style['responsive']}>
      <Table className={style['table']}>
        {tableHead !== undefined ? (
          <TableHead >
            <TableRow className={style['table-head-row']}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={style['table-head-cell']}
                    key={key}
                  >
                    { prop.isSelect ?
                    <FormControl className={classes.formControl} >
                      <NativeSelect
                        name="Tag"
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'tag' }}
                        onChange={(event)=>updateHead(prop.name,event.target.value)}
                      >
                        <option value={prop.name}>{prop.name}</option>
                        {prop.selectList.map((item,index)=>
                          <option value={item} key={item}>
                            {item}
                          </option>
                        )}
                      </NativeSelect>
                    </FormControl>
                    : prop.name
                    }
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop: string[], key) => {
            return (
              <TableRow key={key} className={style['table-body-row']}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={style['table-body-cell']} key={key}>
                      {prop}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}