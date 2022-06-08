import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from "./getpostsid.module.scss"
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai';

const GetPostsId = () => {

  const navigate = useNavigate();
  
  const [postData, setPostData] = useState();
  const [commentsData, setCommentsData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  const getPostsData = async () => {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`)
      .then((res) => res.json());
      // console.log(res.posts)
      setPostData(res.posts)
      setLoaded(true)
  };

  const getCommentData = async (postId, commentId) => {
    const res = await fetch(`http://localhost:8000/api/posts/${postId}/comments/${commentId}`)
      .then((res) => res.json());
      return res.comment
  }


  useEffect(() => {
      getPostsData()
  }, [setPostData])

  useEffect(() => {
    if (postData) {
      const commentsId = postData.comments
      const postId = postData._id
      commentsId.forEach(async (commentId) => {
        const comment = await getCommentData(postId, commentId)
        setCommentsData(oldArray => [...oldArray, comment]);
      })
    }
  }, [postData])

  useEffect(() => {
    console.log(commentsData)
  }, [commentsData])
 

  if(loaded){
    return(
      <div>
        <AiOutlineArrowLeft className={classes.arrowBack} onClick={() => navigate(-1)}/>
        <div className={classes.container}>
            <h1>Titre : {postData.title}</h1>
            <h3>Description :</h3>
            <p>{postData.description}</p>
            <p>Par : {postData.author}</p>
            <p>Posté le : {postData.date.slice(0, 10)}</p>
        </div>
        <h2 className={classes.subTitle}>{commentsData.length > 0 ? "Liste des commentaires" : "Pas encore de commentaires"}</h2>
        <div className={classes.btns}>
          <button className={classes.btn} onClick={() => navigate(`/posts/${postData._id}/comments/new`)}>Ajouter un commentaire</button>
        </div>
        <div className={classes.cardAllPosts}>
          {commentsData && commentsData.length > 0 && commentsData.sort((a, b) => a.date - b.date).map((comment) => (
            <div className='card' key={comment._id}>
              <h2>User : {comment.user_info.name}</h2>
              <p>Content : {comment.content}</p>
              <p>Créé le : {comment.date.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
};

export default GetPostsId;


