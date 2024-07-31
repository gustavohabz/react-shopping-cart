import React from 'react'
import { Navbar } from '../components/Navbar'
import { Alert, Box, Grid } from '@mui/material'
import './../styles/error.css'

export const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Grid 
        justifyContent="center" 
        container 
        spacing={1} 
        className="error-spacing"
      >
        <Grid item xs={6}>
          <Alert severity="error">This page does not exist.</Alert>
        </Grid>
      </Grid>
    </>
  )
}
