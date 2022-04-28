import React from 'react'
import { Button, TextField } from '@mui/material'
import { makeStyles, createStyles } from '@mui/styles'

const useStyles = makeStyles(theme =>createStyles({
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
  },
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: 'var(--base-color)',
        borderColor: 'var(--base-color)'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--alt-color)'
      }
    }
  }
}))

const InputField = ({ type, label, name, value, onChange, onSubmit, buttonText }) => {
  const classes = useStyles()

  return (
    <div className={classes.formControl}>
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField fullWidth type={type} label={label} name={name} value={value} onChange={onChange} placeholder='0.0000 ETH' size='small' classes={{ root: classes.root }} />
        <Button variant='contained' type='submit'>
          {buttonText}
        </Button>
      </form>
    </div>
  )
}

export default InputField