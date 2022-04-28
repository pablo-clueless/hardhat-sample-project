import React from 'react'
import { Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  formControl: {
    margin: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    display: 'grid',
    placeItems: 'center',
    width: '80%',
    padding: '1rem 0',
    '@media screen and (max-width: 800px)': {
      width: '100%'
    }
  }
})

const InputField = ({ type, label, name, value, onChange, onSubmit, buttonText }) => {
  const classes = useStyles()

  return (
    <div className={classes.formControl}>
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField fullWidth type={type} label={label} name={name} value={value} onChange={onChange} placeholder='0.0000 ETH' size='small' />
        <Button variant='contained' type='submit'>
          {buttonText}
        </Button>
      </form>
    </div>
  )
}

export default InputField