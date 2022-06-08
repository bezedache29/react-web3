import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import GetPosts from './components/GetPosts/GetPosts';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import GetPostsId from './components/GetPostsId/GetPostsId';
import NavBar from './components/NavBar/NavBar';
import { Provider } from 'react-redux';
import store from './redux/store'
import RegisterPages from './pages/RegisterPages/RegisterPages';
import LoginPages from './pages/LoginPages/LoginPages';
import DarkMode from './context/DarkMode/DarkMode';
import NewPost from './components/NewPost/NewPost';
import NewComment from './components/NewComment/NewComment';

const App = () => {

  if(localStorage.getItem('saveValueDarkMode') === null){
    localStorage.setItem('saveValueDarkMode', 'false')
  }

  let statusBooleanDarkMode = localStorage.getItem('saveValueDarkMode') === 'false' ? false : true;

  const [darkMode, setDarkMode] = useState(statusBooleanDarkMode)

  useEffect(() => {
      localStorage.setItem('saveValueDarkMode', darkMode);
  }, [darkMode])

    return (
      <Provider store={store}>
        <div className={darkMode ? 'main-container-dark' : 'main-container'}>
          <div>
            <Router>
              <DarkMode.Provider value={{
                      darkMode,
                      toggle: () => setDarkMode(!darkMode)
              }}>

                <NavBar/>

                <Routes>

                  <Route path='/posts' element={ <GetPosts/> }/>
                  <Route path='/posts/new' element={<NewPost/>}/>
                  <Route path='/posts/:id' element={ <GetPostsId/> }/>
                  <Route path='/posts/:id/comments/new' element={ <NewComment/> }/>
                  <Route path='/register' element={ <RegisterPages/> }/>
                  <Route path='/login' element={ <LoginPages/> }/>

                </Routes>
              </DarkMode.Provider>

            </Router>
          </div>

        </div>
      </Provider>

    );
};


reactDom.render(<App />, document.getElementById('root'));