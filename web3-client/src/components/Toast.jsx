import React from 'react'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    toastContainer: {
        // width: '100vw',
        // height: '100vh',
        position: 'absolute',
        top: 90,
        left: '40%',
        display: 'grid',
        placeItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 2,
    },
    toast: {
        width: '20vw',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        backgroundColor: 'var(--light)',
        padding: '1rem 0',
        border: '1px solid var(--dark)',
        borderRadius: '5px',
        transition: '0.5s ease',
        '&:hover': {
            boxShadow: '1px 1px 2px 1px var(--dark)',
            transform: 'translateY(-5px)',
        }
    }
})

const Toast = ({ message, clearToast }) => {
    const classes = useStyles()

  return (
    <div className={classes.toastContainer}>
        <div className={classes.toast}>
            <Typography variant='body2' color='error'>
                {message}
            </Typography>
            <Button variant='text' onClick={clearToast}>
                Close
            </Button>
        </div>
    </div>
  )
}

export default Toast