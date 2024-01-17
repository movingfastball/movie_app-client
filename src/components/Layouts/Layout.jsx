import { Box, Container, Grid } from '@mui/material'
import React from 'react'

const Layout = () => {
  return (
    <Container >
        <Grid container spacing={3} py={4}>
            <Grid item xs={12} md={3}>
                <Box>
                    {/* サイドバー */}
                    sideber
                </Box>
            </Grid>

            <Grid item xs={12} md={9}>
                {/*children*/}
                コンテンツ
            </Grid>
        </Grid>
    </Container>
  )
}

export default Layout