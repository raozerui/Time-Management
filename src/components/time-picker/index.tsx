import 'date-fns'
import React, { useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers'

import GridItem from '../grid'

export interface TimepickerProps {
  labalText?: string
  initTime?: Date
  updateTime: (i:number)=>any
}

export function Timepicker(props: TimepickerProps) {
  const {labalText, initTime, updateTime} = props
  const [selectedTime, setSelectedTime] = useState(new Date())
  

  useEffect(()=>{
    initTime && setSelectedTime(initTime)
  },[initTime])

  const handleTimeChange = (time:Date|null) => {
    if(time) {
      setSelectedTime(time)
      updateTime(new Date(time).getTime())
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <GridItem xs={12} sm={12} md={6}>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label={labalText||'当前时间'}
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </GridItem>
    </MuiPickersUtilsProvider>
  )
}