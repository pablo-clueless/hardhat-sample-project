import { createTheme } from '@mui/material'

export const theme = createTheme({
    typography: {
        fontFamily: 'var(--base-font)'
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: 'var(--base-color)',
                    color: 'var(--light)',
                    margin: '1.5rem 0',          
                    transition: '0.3s ease',
                    textTransform: 'capitalize',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'var(--alt-color)'
                    },
                    '@media screen and (max-width: 800px)': {
                        fontSize: '0.7rem'
                    }
                },
                outlined: {
                    backgroundColor: 'var(--success)',
                    color: 'var(--light)',
                    transition: '0.3s ease',
                    textTransform: 'capitalize',
                    borderColor: 'var(--success)',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'var(--success)',
                        color: 'var(--light)',
                        borderColor: 'var(--success)'
                    },
                    '@media screen and (max-width: 800px)': {
                        fontSize: '0.7rem'
                    }
                },
                text: {
                    backgroundColor: 'var(--error)',
                    color: 'var(--light)',
                    transition: '0.3s ease',
                    textTransform: 'capitalize',
                    borderColor: 'var(--error)',                    
                    marginTop: '0.5rem',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        backgroundColor: 'var(--error)',
                        color: 'var(--light)',
                        borderColor: 'var(--error)',
                    },
                    '@media screen and (max-width: 800px)': {
                        fontSize: '0.7rem'
                    }
                }
            }
        }
    },
    palette: {
        text: {
            primary: '#071B85',
            secondary: '#757575',
            alternate: '#000000',
            error: '#F02525'
        }
    }
})