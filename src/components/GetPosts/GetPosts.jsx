import React, { useEffect, useState } from 'react';
import GetPostsId from '../GetPostsId/GetPostsId';
import { useNavigate } from 'react-router-dom';
import classes from './getposts.module.scss'

const GetPosts = () => {

  const [postsData, setPostsData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [idLoad, setIdLoad] = useState();

  const getPostsData = async () => {
    const res = await fetch('http://localhost:8000/api/posts')
      .then((res) => res.json());
      console.log(res)
      setPostsData(res)
      setLoaded(true)
  }

  useEffect(() => {
      getPostsData()
  }, [setPostsData])

  let history = useNavigate();

  const handleClick = (id) => {
      history(`/posts/${id}`)
  }

  return (
    <div className={classes.cardAllPosts}>
      <div className='card'>
        {!loaded &&
          <p>Loading...</p>
        }
        {loaded && postsData.map(post => {
          return(
            <div key={post._id}>
              <h2>Titre : {post.title}</h2>
              <p>Description :</p>
              <p>{post.description.slice(0, 35)}...</p>
              <p>Par : {post.author}</p>
              <p>Posté le : {post.date.slice(0, 10)}</p>
              <button onClick={() => handleClick(post._id)}>Voir</button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default GetPosts;



  