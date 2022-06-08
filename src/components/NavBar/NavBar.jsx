import React, { useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogOut from '../LogOut/LogOut';
import styles from '../../styles/style.scss'
import DarkMode from '../../context/DarkMode/DarkMode';

const NavBar = () => {

    const token = Cookies.get('token');
    const isConnected = useSelector(state => state.connected);

    const nightMode = useContext(DarkMode)

    if(localStorage.getItem('saveValueDarkMode') === null){
      localStorage.setItem('saveValueDarkMode', 'false')
    }
  
    let statusBooleanDarkMode = localStorage.getItem('saveValueDarkMode') === 'false' ? false : true;
    const [darkMode, setDarkMode] = useState(statusBooleanDarkMode)
  
    useEffect(() => {
        localStorage.setItem('saveValueDarkMode', darkMode);
    }, [darkMode])

    return ( 
    <div>
      <div className='container'>
        {!isConnected.connected && <Link className='nav-link' to='/register'>Inscription</Link>}
        {!isConnected.connected && <Link className='nav-link' to='/login'>connexion</Link>}
        {isConnected.connected && <Link className='nav-link' to='/'><LogOut/></Link>}
        <label className='switch'>
              <input type="checkbox" className={`${DarkMode ? 'dark-mode' : 'light-mode'}`} onClick={nightMode.toggle} />
              <span className='slider round'></span>
        </label>

      </div>
      <div className='header'>
        <h1 className='title'><span className='title-color'>Blog</span> React</h1>
        <p>Bienvenue sur mon Blog en ReactJS qui fetch une API NodeJS</p>
        <a className='link' href="/posts">Voir les posts</a>
        <a className='link' href="/posts/new">Nouveau post</a>
      </div>
    </div>
          );
};

export default NavBar;






