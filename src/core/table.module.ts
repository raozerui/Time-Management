import React from 'react'
import {TagProps, DataProps} from './contrains'

// 本来不打算单独做一个model层，因为内容少交互也不多，但是在table设计中发现要处理复杂交互，需要用到中间层降低复杂度
// tableModel内部维护需要展示到表格上的数据，组件通过调用，拿到当前页的数据，渲染到页面上
class tableModel {
  private endIndex = 0
  private startIndex  = 0
  private tableData:string[][] = []

  initTableData(data:DataProps[]) {
    this.tableData = []

    data.map((item, index)=>{
      let tableRowData:string[] = []
        tableRowData.push(item.tag)
        tableRowData.push(item.content)
        tableRowData.push(new Date(item.startTime).toTimeString().slice(0,5))
        tableRowData.push(new Date(item.endTime).toTimeString().slice(0,5))

        this.tableData.push(tableRowData)
    }) 
  }

  //用于更新model层的数据,后续的翻页，数目变更都都tableData基础上操作
  updateTableData(data:DataProps[], tagName: string) {
    this.tableData = []

    data.map((item, index)=>{
      let tableRowData:string[] = []
      if(item.tag === tagName) {
        tableRowData.push(item.tag)
        tableRowData.push(item.content)
        tableRowData.push(new Date(item.startTime).toTimeString().slice(0,5))
        tableRowData.push(new Date(item.endTime).toTimeString().slice(0,5))

        this.tableData.push(tableRowData)
      }
    }) 
  }

  // 选择tag时更新tableData
  selectData(data:DataProps[], amount: number, tagName: string){
    this.updateTableData(data, tagName)
    return this.tableData.slice(0, amount)
  }

  handleData(amount: number, page: number ){
    this.endIndex = page*amount
    this.startIndex = (page-1)*amount
    if(this.startIndex > this.tableData.length) {
      this.startIndex = this.tableData.length - 1 - amount
    }
    
    return this.tableData.slice(this.startIndex, this.endIndex)
  }


  //处理头部数据
  handleHeadData(tagList: TagProps[]){
    let selectList:string[]= []
    tagList.map((item, index)=>{
      selectList.push(item.tag)
    })
    return [
      {
        name: '标签',
        isSelect: true,
        selectList
      },{name:'内容'},{name:'起始时间'},{name: '结束时间'}
    ]
  }

}

export default new tableModel()