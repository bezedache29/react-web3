import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import classes from "./register.module.scss"
import { userError, userLogin } from '../../redux/stateUser/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [loaded, setLoaded] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tokenGet, setTokenGet] =useState();
    const navigate = useNavigate();

    const isConnected = useSelector(state => state.connected);
    const registerError = useSelector(state => state.error);

    const dispatch = useDispatch();

    const changeConnectedStatus = () =>  {
      dispatch(userLogin())
    }


    useEffect(() => {
        console.log(isConnected)
    }, [isConnected])

    
    const data = {
        name: name,
        email: email,
        password: password
    };
      
      const registerFetchRequest = () => {
          fetch('http://localhost:8000/api/user/register', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
          .then((response) => {
              if(response.error) {
                  console.log(response.message[0].messages[0].message);
                } else {
                  console.log(response)
                  Cookies.set('token', response.token)
                  Cookies.set('id', response.user._id)
                  navigate('/')
                  changeConnectedStatus() 
              }
            })

      }

      
            
    

    return (
        <div >
            <form className={classes.container} action="post">
                <label htmlFor="input-username-register">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id='input-username-register' />

                <label htmlFor="input-email-register">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='input-email-register' />

                <label htmlFor="input-password-register">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='input-password-register'/>


                <button type="button" onClick={() => registerFetchRequest()}>Register</button>
            </form>
        </div>
    );
};

export default Register;