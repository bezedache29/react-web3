import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import classes from '../NewPost/newpost.module.scss'
import { useDispatch } from 'react-redux';

const NewComment = () => {

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCookie = Cookies.get('token')

  const [content, setContent] = useState('')

  const data = {
    content
  };

  const createCommentFetchRequest = () => {
    fetch(`http://localhost:8000/api/posts/${id}/comments`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${userCookie}`
      'auth-token': userCookie
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      console.log('response: ', response)
        if(response.error) {
            // console.log(response.message[0].messages[0].message);
            // dispatch(userError(response.message[0].messages[0].message));
            console.log(response.error)
        } else {
            console.log(response)
            navigate(`/posts/${response._id}`)
        }
    })
  }

  return (
    <div >
      <form action="post">
        <label htmlFor="Content">Content :</label>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} id='content' />

        <button type="button" onClick={() => createCommentFetchRequest()}>Create comment</button>
      </form>
    </div>
  )
}

export default NewComment