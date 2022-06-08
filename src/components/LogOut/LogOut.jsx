import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/stateUser/userAction';
import { useNavigate } from 'react-router-dom';
import styles from './logout.module.scss'

const LogOut = () => {

    const dispatch = useDispatch();

    let navigate = useNavigate();



    const logOut = () => {
        Cookies.remove('token')
        Cookies.remove('id')
        dispatch(userLogout())
        navigate('/')
    }

    return (
        <div>
            <a href='/' className='logout-btn' onClick={() => logOut()}>Déconnexion</a>
        </div>
    );
};

export default LogOut;