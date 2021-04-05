import React from 'react'
import { useState, useEffect } from 'react';
import Header from '../header/Header';
import { db } from '../../firebase';
import Post from '../post/Post';
import { } from './Home.css'
import { AuthContext } from '../../App';

function Home() {

    const [posts, setPosts] = useState([]);
    const { state, dispatch } = React.useContext(AuthContext);

    useEffect(() => {
        db.collection("users").onSnapshot(querySnapshot => {
            querySnapshot.docs.map(doc => {
                db.collection('users/' + doc.id + '/posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                    setPosts(snapshot.docs.map(docu => ({
                        id: docu.id,
                        post: docu.data(),
                        postUserId:doc.id,
                    })
                    ))
                })
            })
        });

    }, []); 
       return (
        <div className="app">
            <Header></Header>
            <div className="posts__list">
                {
                    
                    posts.map(({ id, post,postUserId }) => (<Post key={id} postId={id} actualUser={state.user.user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} postUserProfileImg={post.profileImageUrl} postedUserId={postUserId}/>))
                }
            </div>
        </div>
    )
}
export default Home;