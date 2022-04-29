import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    textWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',
        margin: '1rem 0'
    }
})

const Text = ({ label, content }) => {
    const classes = useStyles()

  return (
    <div className={classes.textWrapper}>
        <Typography variant='h6' color='primary'>
          {label}
        </Typography>
        <Typography variant='body1' color='primary'>
          {content}
        </Typography>
    </div>
  )
}

export default Text