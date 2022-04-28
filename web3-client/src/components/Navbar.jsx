import React from 'react'
import { Button, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    nav: {
        width: '100%',
        borderBottom: '2px solid var(--dark)'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '1rem 0',
        '@media screen and (max-width: 800px)': {
            fontSize: '0.7rem'
        }
    }
})

const Navbar = ({ connectWallet, isWalletConnected }) => {
    const classes = useStyles()

  return (
    <nav className={classes.nav}>
       <Toolbar className={classes.toolbar}>
           <Typography variant='body1' marginLeft={2}>
                Bank dApp 💰
            </Typography>
            <Button variant={isWalletConnected ? 'outlined' : 'text'} onClick={connectWallet}>
                {isWalletConnected ? 'Wallet Connected 🔒' : 'Connect Wallet 🔑'}
            </Button>
       </Toolbar>
    </nav>
  )
}

export default Navbar