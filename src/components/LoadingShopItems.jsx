import { Card, CardContent, Grid, Skeleton } from '@mui/material'
import React from 'react'

export const LoadingShopItems = () => {
    const SKELETON_NUMBER = 6
    const SKELETON_ARRAY = [...Array(SKELETON_NUMBER).keys()]
  return (
    <>
        {SKELETON_ARRAY.map((i) => (
            <Grid key={i} item lg={3} md={4} xs={6} sm={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Skeleton 
                            animation="wave"
                            variant="rectangular"
                            height={400}
                            width={300}
                        />
                    </CardContent>  
                </Card>
            </Grid>
        ))}
    </>
  )
}
