import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userError } from '../../redux/stateUser/userAction';
import classes from './newpost.module.scss'
import { useNavigate } from 'react-router-dom';


const NewPost = () => {

    const [title, setTitle] = useState('');
    const [user, setUser] = useState('');
    const [description, setDescription] = useState()
    const userState = useSelector(state => state)
    const navigate = useNavigate();


    const dispatch = useDispatch();


    const userCookie = Cookies.get('token')


    const data = {
        title: title,
        description: description,
        user: userCookie
      };
      
      const createPostFetchRequest = () => {
          fetch('http://localhost:8000/api/posts/new', {
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
              if(response.error) {
                  console.log(response.message[0].messages[0].message);
                  dispatch(userError(response.message[0].messages[0].message));
                  console.log(userError)
              } else {
                  console.log('resp: ', response)
                  navigate(`/posts/${response._id}`)
              }
          })

      }




    return (
    <div className={classes.main}>
        <form action="post">
            <label htmlFor="title">Titre :</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id='title' />

            <label htmlFor="description">Description :</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} id='description' />

            <button type="button" onClick={() => createPostFetchRequest()}>Create post</button>        
        </form>
    </div>

    );
};

export default NewPost;