import React from 'react'
import style from './table.module.css'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

export interface TableProps {
  tableHead: string[]
  tableData: string[][]
}
export function TableCustom(props:TableProps){
  const {tableHead, tableData} = props

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
                    {prop}
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