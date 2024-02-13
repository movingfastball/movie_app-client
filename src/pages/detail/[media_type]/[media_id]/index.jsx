
import AppLayout from '@/components/Layouts/AppLayout';
import laravelAxios from '@/lib/laravelAxios';
import { Box, Button, Card, CardContent, Container, Fab, Grid, Modal, Rating, TextareaAutosize, Tooltip, Typography } from '@mui/material';
import axios from 'axios'
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AddIcon from'@mui/icons-material/Add'
import StarIcon from'@mui/icons-material/Star'


const Detail = ({detail, media_type, media_id}) => {
  const[open, setOpen] = useState(false)
  const[rating, setRating] = useState(0);
  const[review, setReview] = useState("");
  const[reviews, setReviews] = useState([]);
  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }
  
  const handleReviewChagne = (e) => {
    setReview(e.target.value)
    console.log(review)
  }

  const handleRatingChagne = (e, newValue) => {
    setRating(newValue)
    console.log(rating);
  }

  const isDisabled = !rating || !review.trim()

  const handleReviewAdd = async() => {
    handleClose()
    try {
      const response = await laravelAxios.post(`api/reviews`,{
        content: review,
        rating: rating,
        media_type: media_type,
        media_id: media_id
      })
      //console.log(response.date);
      const newReview = response.data;

      setReviews([...reviews, newReview]);
      console.log(reviews);
      
      //レビュー送信時close処理
      setReview("");
      setRating(0);
      const updatedReviews = [...reviews, newReview];
      console.log(updatedReviews)
      updateAverageRating(updatedReviews);

    } catch(err) {
      console.log(err);
    }
  }

  const updateAverageRating = (updatedReviews) => {

  }




/*
  const reviews = [
    {
      id:1,
      content:"面白かった",
      rating:4,

      user:{
        name:"山田花子",
      }
    },
    {
      id:2,
      content:"おもんな",
      rating:1,

      user:{
        name:"最底子",
      }
    },
    {
      id:3,
      content:"普通",
      rating:3,

      user:{
        name:"平凡太郎",
      }
    }
  ]
*/
    useEffect(() => {
      const fetchReviews = async() => {
        try {
          const response = await laravelAxios.get(`api/reviews/${media_type}/${media_id}`)
          console.log(response.data);
          setReviews(response.data)
        } catch(err) {
          console.log(err)
        }
      }
      fetchReviews()

    }, [media_type, media_id])

 


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
          sx = {{ 
            height:{xs:"auto", md:"70vh"},bgcolor: "red", prosition:"relative", display:"flex", alignItems:"center"
            }}
      >
        <Box
            style={{ 
                backgroundImage:`url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})`,
                position:"absolute",
                top:0,
                bottom:50,
                left:0,
                right:0,
                backgroundSize:"cover",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat",

                '&::before': {
                  content:'"',
                  position:"absolute",
                  top:0,
                  bottom:0,
                  left:0,
                  right:0,
                  backgroundColor: 'reba(0,0,0,0.5)',
                  backdropFilter:'blur(10px)',
                }
              }}
          />
        <Container sx={{ zIndex: 1}}>
          <Grid sx={{color: "white" }} container alignItems={"center"}> 
            <Grid item md={4} sx = {{ display:"flex", justifyContent:"center" }}>
              <img width={"70%"} src={`https://image.tmdb.org/t/p/original/${detail.poster_path} `}/>
            </Grid>
            <Grid item md={8} sx={{ bgcolor:"orenge" }}>
              <Typography variant="h4" paragraph>{detail.title || detail.name}</Typography>
              <Typography paragraph>{detail.overview}</Typography>
              <Box
                gap={2}
                sx = {{ 
                  display:"flex",
                  alignItems:"center",
                  mb:2
                 }}
              >
                <Rating 
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon style={{color:"white"}}/>}
                />

                <Typography
                  sx={{
                    ml:1,
                    fontSize:'1.5rem',
                    fontWeight:"bold",
                   }}
                >3</Typography>
              </Box>
              <Typography variant="h6" paragraph>
                {media_type == "movie" ? `公開日:${detail.release_date}`:`初回放送日:${detail.first_air_date}`}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/*レビュー内容表示*/}
      <Container sx={{ py:4 }}>
        <Typography
          component={"h1"}
          variant='h4'
          align='center'
          gutterBottom
        >レビュー一覧
        </Typography>

          <Grid container spacing={3}>
                {reviews.map((review) => (
                  <Grid item xs={12} key={review.id}>
                    <Card>
                      <CardContent>
                        <Typography
                          variant='h6'
                          component={"div"}
                          gutterBottom
                        >
                          {review.user.name}
                        </Typography>

                        <Rating
                          value = {review.rating}
                          readOnly
                        />

                        <Typography
                          variant='body2'
                          color="textSecondary"
                          paragraph
                        >
                          {review.content}
                        </Typography>


                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Container>
      {/*レビュー追加ボタンstart*/}
      <Box
        sx={{ 
          position: "fixed",
          bottom:"16px",
          right:"16px",
          zIndex:5,
        }}
      
      >
        <Tooltip title="レビュー追加">
          <Fab
            style={{ background:"blue",color:"white" }}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      {/*レビュー追加ボタンEnd*/}

      {/*モーダルウィンドウstart*/}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{ 
            position:"absolute",
            top:"50%",
            left:"50%",
            transform:"translate(-50%, -50%)",
            width:400,
            bgcolor:"background.paper",
            border:"2px solid, #000",
            boxShadow: 24,
            p: 4
          }}
        >

        <Typography variant="h6" componet="h2">
          レビューを書く
        </Typography>

        <Rating
          required
          onChange={handleRatingChagne}
          value={rating}
        />

        <TextareaAutosize
          required
          minRows={5}
          placeholder="レビュー内容"
          style={{ width:"100%", marginTop:"10px" }}
          onChange={handleReviewChagne}
          value={review}
        />

        <Button
          variant='outlined'
          disabled={isDisabled}
          onClick={handleReviewAdd}
        >
          送信
        </Button>

        </Box>
      </Modal>
      {/*モーダルウィンドウEnd*/}
    </AppLayout>
  )
}

export async function getServerSideProps(context) {
  const { media_type, media_id } = context.params

  try {
    const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);
    const combinedData = {...jpResponse.data};

    if(!jpResponse.data.overview) {
      const enResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-EN`);
      combinedData.overview = enResponse.data.overview
    }

    return {
      props:{detail:combinedData, media_type, media_id}
    }
  } catch {
    return {
      notFound:true
    }
  }
}
export default Detail