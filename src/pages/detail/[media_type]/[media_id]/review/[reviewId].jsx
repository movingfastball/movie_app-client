import CommentList from '@/components/CommentList';
import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios';
import { Box, Button, Card, CardContent, Container, Rating, TextField, Typography } from '@mui/material';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const ReviewDetail = () => {

    const[review,setReview] = useState(null);
    const[comments,setComments] = useState([]);
    const[content,setContent] = useState("");
    const router = useRouter();
    const { reviewId } = router.query;
    console.log(reviewId);

    useEffect(() => {
        if(!reviewId) return;
        const fetchReviewDetail = async() => {
            try {
                const response = await laravelAxios.get(`api/review/${reviewId}`);
                console.log(response);
                setReview(response.data);
                setComments(response.data.comments);
                console.log(comments);
            } catch (err) {
                console.log(err)
            }
        }
        fetchReviewDetail();
    },[reviewId])

    const handleChange = (e) => {
        setContent(e.target.value);
        console.log(content);
    }

  return (
    <AppLayout header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            ReviewDetail
        </h2>
    }>
        <Head>
            <title>Laravel - ReviewDetail</title>
        </Head>
        
        <Container sx={{ py:2 }}>
            {review ? (
            <>
                {/*レビュー内容*/}
                <Card>
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="p"
                            gutterBottom
                        >
                            {review.user.name}
                        </Typography>

                        <Rating
                            name="read-only"
                            value={review.rating}
                            readOnly
                        />

                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {review.content}
                        </Typography>
                    </CardContent>
                </Card>

                {/* 返信用のフォーム */}
                <Box
                    component="form"
                    //onSubmit={handleCommentAdd}
                    noValidate
                    autoComplete="off"
                    p={2}
                    sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'flex-start',
                        bgcolor: 'background.paper',
                    }}
                >
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        error={content.length > 5}
                        helperText={content.length > 5 ? '200文字を超えています' : ''}
                        fullWidth
                        label="comment"
                        variant="outlined"
                        value={content}
                        onChange={handleChange}
                        sx={{ mr: 1, flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        style={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                        }}
                    >
                        送信
                    </Button>
                </Box>

                {/*コメント*/}
                <CommentList comments={comments}/>
            </>
            ) : (
                <div>Loading...</div>
            )}
        </Container>
    </AppLayout>
  )
}

export default ReviewDetail