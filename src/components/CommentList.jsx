import { Grid } from '@mui/material'
import React, { useState } from 'react'
import Comment from './Comment'
import laravelAxios from '@/lib/laravelAxios'

const CommentList = ({comments, setComments}) => {
  const[editMode, setEditMode] = useState(null);
  const[editedContent, setEditedContent] = useState("");
  console.log(comments)

  //Comment.jsxの削除を押下したいのconst定義
  const handleDelete = async (commentId) => {
    try {
      const response = await laravelAxios.delete(`api/comments/${commentId}`);
      console.log(response.data);

      const filterdComments = comments.filter((comment) => comment.id !== commentId)
      setComments(filterdComments);
    } catch(err) {
      console.log(err);
    }
  }


  const handleEdit = (comment) => {
    setEditMode(comment.id);
    setEditedContent(comment.content);
  }

  const handleConfirmEdit = async(commentId) => {
    try {
      const response = await laravelAxios.put(`api/comments/${commentId}`,{
        content:editedContent,
      })

      console.log(response.data);

    } catch (err) {
      console.log(err);
    }
    
    
  }
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
        {comments.map((comment) =>(
          
            <Grid item xs={12} key={comment.id}>
                <Comment 
                  comment={comment}
                  onDelete={handleDelete}
                  handleEdit={handleEdit}
                  editMode={editMode}
                  editedContent={editedContent}
                  setEditedContent={setEditedContent}
                  handleConfirmEdit={handleConfirmEdit}
                />
            </Grid>
        ))}
    </Grid>
  )
}

export default CommentList