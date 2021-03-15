import React,{useState} from 'react';
import './App.css';
import Post from './Post';
function App() {
  const [posts, setPosts]=useState([
    {imageUrl:"https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png", username:"Iván", caption:"Hi there"},
    {imageUrl:"https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png", username:"Iván", caption:"Hi there"}
  ]);


  return (
    <div className="app">
      {/* Header*/}
      <div className="app__header">
        <img className="app__header__img"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <h1>Hello from instagram clone</h1>
      {
        posts.map(post => (<Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>))
      }

      <Post imageUrl="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" username="Iván" caption="Hi there"/>
      <Post imageUrl="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" username="Thomas" caption="Hi there"/>
      <Post imageUrl="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png" username="Gordon" caption="Hi there"/>      {/* Post*/}
      {/* Post*/}
    </div>
  );
}

export default App;
