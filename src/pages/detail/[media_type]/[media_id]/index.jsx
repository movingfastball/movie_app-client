

import { Box, Container, Grid, Typography } from '@mui/material';
import axios from 'axios'
import Head from 'next/head';
import React from 'react'

const Detail = ({detail}) => {
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Detail
        </h2>
      }>
      <Head>
          <title>Laravel - Detail</title>
      </Head>
      <Box 
          sx ={{ 
            height:{xs:"auto", md:"70vh"},bgcolor: "red", prosition:"relative", display:"flex", alignItems:"center"
            }}
      >
        <Box
            style={{ 
                backgroundImage:`url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
                position:"absolute",
                top:0,
                bottom:0,
                left:0,
                right:0,
              }}
          />
        <Container sx={{ zIndex: 1}}>
          <Grid sx={{color: "white" }} container alignItems={"center"}> 
            <Grid item md={4} sx = {{ display:"flex", justifyContent:"center" }}>
              <img width={"70%"} src={`https://image.tmdb.org/t/p/original/${detail.poster_path} `}/>
            </Grid>
            <Grid item md={8} sx={{ bgcolor:"orenge" }}>
              <Typography variant="h4" paragraph>{detail.title}</Typography>
              <Typography paragraph>{detail.overview}</Typography>
              <Typography variant="h6" paragraph>公開日:{detail.release_date}</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppLayout>
  )
}

export async function getServerSideProps(context) {
  const { media_type, media_id } = context.params

  try {
    const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);
    const combinedData = {...jpResponse.data};

    const newProfile = {...profile};

    if(!jpResponse.data.overview) {
      const enResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
      combinedData.overview = enResponse.data.overview;
    }


    return {
      props:{detail:combinedData}
    }
  } catch {
    return {
      notFound:true
    }
  }
}
export default Detail