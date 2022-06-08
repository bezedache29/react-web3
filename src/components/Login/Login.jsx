// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import { userError, userLogin } from '../../redux/stateUser/userAction';
// import { useDispatch, useSelector } from 'react-redux';

// const Login = () => {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const isConnected = useSelector(state => state.connected);
//     const registerError = useSelector(state => state.error);

//     const dispatch = useDispatch();

//     const changeConnectedStatus = () =>  {
//       dispatch(userLogin())
//     }


//     useEffect(() => {
//         console.log(isConnected)
//     }, [isConnected])


//     const data = {
//         email: email,
//         password: password
//       };
      
//       const loginFetchRequest = () => {
//           fetch('http://localhost:8000/api/user/login', {
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//           })
//           .then((response) => response.json())
//           .then((response) => {
//               if(response.error) {
//                   console.log(response.message[0].messages[0].message);
//               } else {
//                   console.log(response)
//                   Cookies.set('token', response.token);
//                   Cookies.set('id', response.user._id);
//                 //   dispatch(userLogin(response.token, response.user._id))
//                   changeConnectedStatus()
//                   navigate('/')

//               }
//           })

//       }


//     return (
//         <div>
//             <form action="post">
//                 <label htmlFor="input-email-register">Email</label>
//                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='input-email-register' />

//                 <label htmlFor="input-password-register">Password</label>
//                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='input-password-register'/>


//                 <button type="button" onClick={() => loginFetchRequest()}>Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;



import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userError, userLogin } from '../../redux/stateUser/userAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const isConnected = useSelector(state => state.connected);
    const registerError = useSelector(state => state.error);



    const dispatch = useDispatch();

    const changeConnectedStatus = () =>  {
      dispatch(userLogin())
    }
    
    useEffect(() => {
        console.log(isConnected)
    }, [isConnected])

    const logInFetchRequest = () => {
        const data = {
            email: email,
            password: password
        };
        fetch('http://localhost:8000/api/user/login', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            if(response.error) {
                console.log(response.message[0].messages[0].message);
                dispatch(userError(response.message[0].messages[0].message));
                console.log(userError)
            } else {
              console.log(response.jwt)
              Cookies.set('token', response.token);
              Cookies.set('id', response.user._id)

              dispatch(userLogin(response.token))
              navigate('/')
              changeConnectedStatus()
            }
          })
    }



    return (
        <div>
            <form action="post">
                <label htmlFor="input-email-register">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='input-email-login' />

                <label htmlFor="input-password-register">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id='input-password-login'/>


                <button type="button" onClick={() => logInFetchRequest()}>LogIn</button>
            </form>
        </div>
    );
};

export default Login;