import { Box, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './../styles/home.css'

export const Home = () => {
  return (
    <>
        <Box align="center">
            <div className="home-spacing">
                <h1>Faker's Shopping</h1>
                <Link to="/shop">
                    <Button variant="contained">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        </Box>
    </>
  )
}
