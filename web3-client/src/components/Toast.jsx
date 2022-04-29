import React, { useEffect, useRef } from 'react'
import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { gsap } from 'gsap'

const useStyles = makeStyles({
    toastContainer: {
        // width: '100vw',
        // height: '100vh',
        position: 'absolute',
        top: 90,
        left: '30%',
        display: 'grid',
        placeItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 2,
    },
    toast: {
        width: '40vw',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        wordBreak: 'break-word',
        backgroundColor: 'var(--light)',
        padding: '1rem 0.5rem',
        border: '1px solid var(--dark)',
        borderRadius: '5px',
        transition: '0.5s ease',
        '&:hover': {
            boxShadow: '1px 1px 2px 1px var(--dark)',
            transform: 'translateY(-5px)',
        }
    }
})

const Toast = ({ message, clearToast, isToast }) => {
    const classes = useStyles()

    const toastRef = useRef()

    useEffect(() => {
        gsap.to(toastRef.current, { y: -20 })
    })

  return (
    <div className={classes.toastContainer} ref={toastRef}>
        <div className={classes.toast}>
            <Typography variant='body2' color='error'>
                {message.substring(0, 74)}
            </Typography>
            {!isToast ?
            <Button variant='text' onClick={clearToast}>
                Close
            </Button> : null }
        </div>
    </div>
  )
}

export default Toast