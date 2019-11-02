import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid,{GridProps} from '@material-ui/core/Grid'

const styles = {
  grid: {
    padding: '0 15px !important'
  }
}
export interface GridItemProps extends GridProps {
  children: JSX.Element
}

const useStyles = makeStyles(styles)

const GridItem = (props: GridItemProps) => {
  const classes = useStyles()
  const { children, ...rest } = props
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  )
}



export default GridItem