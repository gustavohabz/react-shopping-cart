import { BottomNavigation, Paper } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Paper 
        elevation={12}
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
        <BottomNavigation sx={{backgroundColor: '#ffc107', color: '#000000'}}>
            <p>© 2024 <a href="https://github.com/gustavohabz" target="_blank">Gustavo Habitzreiter</a></p>
        </BottomNavigation>
    </Paper>
  )
}
